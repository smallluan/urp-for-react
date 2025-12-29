import { useCallback, useEffect, useMemo, useState } from "react"
import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"
import { UIcon } from "../Icon/index.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { TreeFlattenedNode, Tree } from "./type"
import { expandNode } from "./utils.ts"
import { UCheckBox } from "../CheckBox/index.ts"

const UTree = (props: Tree) => {

  // 将数据源扁平化后的数组
  const [flatArray, setFlatArray] = useState<TreeFlattenedNode[]>([])
  // 数据源发生变化同步更新到内部状态
  useEffect(() => {
    setFlatArray(expandNode(null, props.data, props.expandLevel || 0))
  }, [props.data])

  // 适配多选
  // const [selectedValue, setSelectValue] = useState<TreeFlattenedNode[]>([])

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
    const targetLevel = targetNode.level
    const deleteStartIndex = targetIndex + 1
    let deleteEndIndex = deleteStartIndex

    while (deleteEndIndex < prev.length) {
      const currentNode = prev[deleteEndIndex]
      const currentLevel = currentNode.level
      
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
  const handleIconClicked = useCallback((clickedNode: TreeFlattenedNode) => {
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
  const itemStyle = useCallback((level: number) => {
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

  // 节点被点击（需要分情况考虑，是多选模式还是高亮模式）
  const handleNodeClicked = useCallback((clickedNode: TreeFlattenedNode) => {
    if (!props.activable) return
    const targetIndex = keyToIndexMap[clickedNode.key]
    if (targetIndex === undefined) return

    setFlatArray(prevFlatArray => {
      const newFlatArray = [...prevFlatArray]
      newFlatArray[targetIndex] = {
        ...newFlatArray[targetIndex],
        active: !clickedNode.active
      }
      const activeList = newFlatArray.filter(i => i.active)
      if (props.onActive) {
        props.onActive(activeList)
      }
      return newFlatArray
    })
  }, [props.activable, props.onActive, props.activeMultiple, keyToIndexMap])

  // // 通过 level 生成阴影
  // const genShadowByLevel = (level: number) => {
  //   if (level <= 0) {
  //     return 'none'
  //   }
    
  //   const shadows = []
  //   // 将循环的起始值从 2 改为 1
  //   for (let i = 1; i <= level; i++) {
  //     // 阴影的计算逻辑可以保持不变，或者根据需要调整
  //     shadows.push(`calc(-${i} * 8px)) 0 black`)
  //   }
  //   const res = shadows.join(',')

  //   return {
  //     boxShadow: res
  //   }
  // }

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
            {/* {
              (item.parentNode) &&
              <>
                {
                  item.isFirstChild ? 
                  <div className="line-first-child"/> : 
                  <div style={genShadowByLevel(item.level)} className="line"/>
                }
              </>
            } */}
            <div className={iconContainerClass(item.hasChildren)}>
              {
                item.hasChildren &&
                <UIcon
                  onClick={() => handleIconClicked(item)}
                  className={iconCalss(item.isOpen)}
                  type="CaretRightOutlined"
                />
              }
            </div>
            <div 
              onClick={() => handleNodeClicked(item)} 
              className={`${item.active ? 'u-tree-label-active' : 'u-tree-label'}`}
            >
              {
                props.checkable ?
                <UCheckBox.Group cancelable multiple>
                  <UCheckBox.Item>{item.label}</UCheckBox.Item>
                </UCheckBox.Group> : 
                item.label
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default UTree
