import { useCallback, useEffect, useMemo, useState } from "react"
import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"
import { UIcon } from "../Icon/index.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { TreeFlattenedNode, Tree } from "./type"
import { expandNode } from "./utils.ts"

const UTree = (props: Tree) => {

  // 内部维护 扁平化数组，方便展开/收起节点
  const [flatArray, setFlatArray] = useState<TreeFlattenedNode[]>([])
  // 数据源发生变化同步更新到内部状态
  useEffect(() => {
    setFlatArray(expandNode(null, props.data, 2))
  }, [props.data])

  // key 索引映射表
  const keyToIndexMap = useMemo(() => {
    return flatArray.reduce((map, item, index) => {
      map[item.key] = index
      return map
    }, {} as Record<string, number>)
  }, [flatArray])

  const unfoldNode = useCallback((targetNode:TreeFlattenedNode, targetIndex: number) => {
    const newChildrenNodes = expandNode(targetNode, targetNode.children)
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

  // item 的动态类
  const itemStyle = useCallback((level: string) => {
    return genStyleFromProps({ level })
  }, [])

  const iconContainerClass = useCallback((hasChildren: boolean) => {
    return genClassNameFromProps(
      { hasChildren: hasChildren },
      'u-tree-icon-container',
      'u-tree-icon-container'
    )
  }, [])

  // icon 动态类(仅箭头图标，自定义图标不能加旋转)
  const iconCalss = useCallback((isOpen: boolean) => {
    return genClassNameFromProps(
      { open: isOpen },
      'u-tree-icon',
      'u-tree-icon'
    )
  }, [])

  return (
    <div className="u-tree">
      {
        flatArray.map((item, index) => (
          <div
            className="u-tree-item"
            style={itemStyle(item.level)}
            data-value={item.value}
            data-level={item.level} 
            key={item.key}
          >
            {
              (item.parentNode) &&
              <>
                {/* {
                  Number(item.level) >  Number(flatArray[index + 1]?.level) ?
                  <div style={{ height: '14px', borderRight: '1px solid', }}/> : 
                  <div style={{ height: '28px', borderRight: '1px solid' }}/>
                } */}
                <div className="line"/>
              </>
            }
            <div className={iconContainerClass(item.hasChildren)}>
              {
                item.hasChildren &&
                <UIcon
                  onClick={() => handleClick(item)}
                  className={iconCalss(item.isOpen)}
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
