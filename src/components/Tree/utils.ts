import { TreeOriginalNode, TreeFlattenedNode } from "./type"

/**
 * 展开一个节点（把子节点数组处理后返回）
 * @param parentNode - 父节点（已经处理好的节点，适配扁平化 dom）
 * @param childrenNodes - 子节点（未处理节点，数据结构保持 props 传入时）
 * @param expandLevel - 继续展开层级，默认是 0 只展开当前父节点的子节点
 * @returns - 处理后的子节点数组，适配扁平化 dom 结构
 * @description - 该函数用于处理扁平化树结构的展开问题，引用与组件初始化/展开等场景
 *              - 方法中对场景进行了大量的优化:
 *              - 1. 抛弃低效的数组操作，比如 shift/unshift，转而使用 pop/push 这类高效的数组操作
 *                配合根节点的逆序入栈可以在大数据量下显著提升处理速度
 *              - 2. 抛弃传统处理树结构的递归方式，转而使用迭代，防止在深层处理中的性能问题
 */
export const expandNode = (
  parentNode: TreeFlattenedNode | null, 
  childrenNodes: TreeOriginalNode[] | undefined,
  expandLevel = 0
) => {
  if (
    !Array.isArray(childrenNodes) ||
    childrenNodes.length === 0
  ) return []
  
  const res: TreeFlattenedNode[] = []
  const stack: [TreeOriginalNode, number, null | TreeFlattenedNode, number, number][] = []

  // 根节点逆序入栈，使用操作成本低的 push 和 pop
  for (let i = childrenNodes.length - 1; i >=0 ; i --) {
    const node = childrenNodes[i]
    if (typeof node !== 'object' || node === null) continue
    const childLevel = parentNode ? parentNode?.level + 1 : 0
    stack.push([node, childLevel, parentNode, expandLevel, i])
  }

  // 使用迭代，时间复杂度保持在 O(n)
  while (stack.length) {
    const poped = stack.pop()
    if (!poped) continue

    const [node, level, parent, remainingExpandLevel, childIndex] = poped
    const label = node.label ?? ''
    const value = node.value ?? ''
    const children = Array.isArray(node.children) ? node.children : []

    const newFlattenedNode: TreeFlattenedNode = {
      ...node,
      label,
      value,
      level,
      hasChildren: !!children.length,
      parentNode: parent,
      children,
      isOpen: false,
      childrenRank: childIndex,
      selected: false,
      active: false,
    }
    res.push(newFlattenedNode)

    // 处理展开层级，将子元素的后代依次逆序入栈
    if (remainingExpandLevel > 0 && children.length > 0) {
      newFlattenedNode.isOpen = true
      for (let i = children.length - 1; i >= 0; i--) {
        const childNode = children[i]
        if (typeof childNode !== 'object' || childNode === null) continue
        const nextLevel = level + 1
        stack.push([childNode, nextLevel, newFlattenedNode, remainingExpandLevel - 1, i])
      }
    }
  }

  return res
}

/**
 * forWard: 根据 key 找到一个节点
 * @param flattenedNodes 
 * @param key 
 * @param keyToIndexMap 
 * @returns node
 * @description - 暴露内部基于 map 的高效检索能力，避免使用者使用时外部遍历树结构
 */
export const findNodeByKey = (
  flattenedNodes: TreeFlattenedNode[],
  key: TreeFlattenedNode['key'],
  keyToIndexMap: Record<string, number>
) => {
  return flattenedNodes[keyToIndexMap[key]] || null
}

/**
 * forWard: 根据 key 删除一个节点
 * @param originalNode - 原始节点数据
 * @param key - 将被删除节点的 key
 * @description - 这个方法暴露出去,处理的不是内部的扁平化数组
 *              - 而是用户的嵌套层级数据结构,目的是为用户提供一种高效的删除节点的方法
 *              - 该方法得益于之前进行的预处理,时间复杂度为 O(K)
 *              - 其中 K 是被删除节点在树中的层级,实现精准删除
 */
export const deleteNodeByKey = (
  flattenedNodes: TreeFlattenedNode[],
  keyToIndexMap: Record<string, number>,
  originalNode: TreeOriginalNode[],
  key: TreeOriginalNode['key'],
) => {
  const indexPath = []
  // 先在扁平化数据中找到目标元素,该节点上记录了它父元素的信息
  let targetNode: TreeFlattenedNode | null = flattenedNodes[keyToIndexMap[key]]

  if (!targetNode) {
    console.warn(`对 key = ${key} 的节点删除失败,因为该节点不存在!`)
    return [...originalNode]
  }
  
  while (targetNode) {
    // 把他是他父元素的第几个子节点 push 到路径数组中
    indexPath.push(targetNode.childrenRank)
    // 把他父元素当作目标节点继续向上寻找
    targetNode = targetNode.parentNode
  }

  // 在用户提供的源数据中根据路径直接删除该节点

  const nodeCopy = [...originalNode]
  let currentNodeList: TreeOriginalNode[] = nodeCopy
  while (indexPath.length > 1) {
    const popIndex = indexPath.pop()

    if (popIndex === undefined || popIndex >= currentNodeList.length) {
      break
    }

    currentNodeList = currentNodeList[popIndex].children || []
  }
  
  // 最后将该孩子节点删除
  const finalIndex = indexPath[0]
  if (typeof finalIndex === 'number' && finalIndex >= 0 && finalIndex < currentNodeList.length) {
    currentNodeList.splice(finalIndex, 1)
  }

  return nodeCopy
}
