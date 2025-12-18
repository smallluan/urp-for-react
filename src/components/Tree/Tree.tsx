import { useCallback, useEffect, useMemo, useState } from "react"
import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"
import { UIcon } from "../Icon/index.ts"

// data 单节点
type TreeOriginalNode = {
  key: string;
  label: string;
  value?: string | number;
  children?: TreeOriginalNode[];

}

// 扁平化后的单个节点
type TreeFlattenedNode = {
  key: string;
  label: string;
  value?: string | number;
  level: string;
  hasChildren: boolean;
  parentNode: null | TreeFlattenedNode;
  children: TreeOriginalNode[],
  isOpen: boolean
}

const UTree = (props) => {

  // 内部维护 扁平化数组，方便展开/收起节点
  const [flatArray, setFlatArray] = useState<TreeFlattenedNode[]>(() => {
    // 执行一次数组扁平化，处理第一层节点
    const originData: TreeOriginalNode[] = Array.isArray(props.data) ? props.data : []
    if (originData.length === 0) return []

    const res: TreeFlattenedNode[] = []
    const stack: [TreeOriginalNode, string, null | TreeFlattenedNode][] = []

    // 根节点逆序入栈
    for (let i = originData.length - 1; i >= 0; i --) {
      const node = originData[i]
      if (typeof node !== 'object' || node === null) continue
      stack.push([node, '0', null])
    }

    // 初始化仅处理根节点，子节点需要点击展开
    while (stack.length) {
      const poped = stack.pop()
      if (!poped) continue

      const [node, level, parentNode] = poped
      const label = node.label ?? ''
      const value = node.value ?? ''
      const children = Array.isArray(node.children) ? node.children : []

      res.push({
        ...node,
        label,
        value,
        level,
        hasChildren: !!children.length,
        parentNode,
        children,
        isOpen: false
      })
    }
    return res
  })

  // key 索引映射表
  const keyToIndexMap = useMemo(() => {
    return flatArray.reduce((map, item, index) => {
      map[item.key] = index
      return map
    }, {} as Record<string, number>)
  }, [flatArray])

  // props.data 变化是重新初始化节点
  useEffect(() => {
    const originData: TreeOriginalNode[] = Array.isArray(props.data) ? props.data : []
    if (!originData.length) {
      setFlatArray([])
      return
    }

    const res: TreeFlattenedNode[] = []
    const stack: [TreeOriginalNode, string, null | TreeFlattenedNode][] = []

    for (let i = originData.length - 1; i >= 0; i--) {
      const node = originData[i]
      if (typeof node !== 'object' || node === null) continue
      stack.push([node, '0', null])
    }

    while (stack.length) {
      const popped = stack.pop()
      if (!popped) continue
      const [node, level, parentNode] = popped
      const label = node.label ?? ''
      const value = node.value ?? ''
      const children = Array.isArray(node.children) ? node.children : []

      res.push({
        ...node,
        label,
        value,
        level,
        hasChildren: !!children.length,
        parentNode,
        children,
        isOpen: false
      })
    }
    setFlatArray(res)

  }, [props.data]) 

  // item 的动态类
  const itemStyle = useCallback((level: string) => {
    return genStyleFromProps({ level })
  }, [])

  const unfoldNode = useCallback((targetNode:TreeFlattenedNode, targetIndex: number) => {
    const children = targetNode.children
    if (!children.length) return

    const stack: [TreeOriginalNode, string, TreeFlattenedNode | null][] = []
    for (let i = children.length - 1; i >= 0; i --) {
      const child = children[i]
      if (typeof child !== 'object' || child === null) continue
      stack.push([child, String(Number(targetNode.level) + 1), targetNode])
    }

    const newChildrenNodes: TreeFlattenedNode[] = []
    while (stack.length) {
      const popped = stack.pop()
      if (!popped) continue
      const [node, level, parent] = popped
      const label = node.label ?? ''
      const value = node.value ?? ''
      const children = Array.isArray(node.children) ? node.children : []
      newChildrenNodes.push({
        ...node,
        label,
        value,
        level,
        hasChildren: !!children.length,
        parentNode: parent,
        children: children,
        isOpen: false
      })
    }

    // 将子节点插入到父节点的后边
    setFlatArray(prev => {
      const newArray = [...prev]
      newArray.splice(targetIndex + 1, 0, ...newChildrenNodes)
      newArray[targetIndex] = {
        ...newArray[targetIndex],
        isOpen: true
      }
      return newArray
    })
  }, [])

  const foldNode = useCallback((targetNode: TreeFlattenedNode, targetIndex: number) => {
  setFlatArray(prev => {
    const targetLevel = Number(targetNode.level)
    const deleteStartIndex = targetIndex + 1
    let deleteEndIndex = deleteStartIndex

    while (deleteEndIndex < prev.length) {
      const currentNode = prev[deleteEndIndex]
      const currentLevel = Number(currentNode.level)
      
      if (currentLevel <= targetLevel) break
      deleteEndIndex++
    }

    const newArray = [...prev]
    // 只有需要删除时才 splice
    if (deleteEndIndex > deleteStartIndex) {
      newArray.splice(deleteStartIndex, deleteEndIndex - deleteStartIndex)
    }
    // 重置展开状态
    newArray[targetIndex] = {
      ...newArray[targetIndex],
      isOpen: false,
    }
    return newArray
  })
}, [])

  // 点击 图标/node 时，展开或者收起
  const handleClick = useCallback((clickedNode: TreeFlattenedNode) => {
    // 找到被点击元素在 flatArray 中的索引
    const targetIndex = keyToIndexMap[clickedNode.key]
    if (targetIndex === -1) return  // 未找到目标元素
    const targetNode = flatArray[targetIndex]
    if (!targetNode.hasChildren) return  // 该元素没有孩子节点

    if (!targetNode.isOpen) {
      unfoldNode(targetNode, targetIndex)
    } else {
      foldNode(targetNode, targetIndex)
    }
  }, [flatArray, keyToIndexMap, foldNode, unfoldNode,])

  return (
    <div className="u-tree">
      {
        flatArray.map(item => (
          <div
            className="u-tree-item"
            style={itemStyle(item.level)}
            data-value={item.value}
            data-level={item.level} 
            key={item.key}
          >
            <div className="u-tree-icon-container">
              {
                item.hasChildren &&
                <UIcon
                  onClick={() => handleClick(item)}
                  className="u-tree-icon"
                  type="CaretRightOutlined"
                />
              }
            </div>
            <div className="u-tree-label">{item.label}</div>
          </div>
        ))
      }
    </div>
  )
}

export default UTree
