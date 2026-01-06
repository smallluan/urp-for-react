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
  const stack: [TreeOriginalNode, number, null | TreeFlattenedNode, number][] = []

  // 根节点逆序入栈，使用操作成本低的 push 和 pop
  for (let i = childrenNodes.length - 1; i >=0 ; i --) {
    const node = childrenNodes[i]
    if (typeof node !== 'object' || node === null) continue
    const childLevel = parentNode ? parentNode?.level + 1 : 0
    stack.push([node, childLevel, parentNode, expandLevel])
  }

  // 标记每个节点的字一个子节点（画线用的）
  let isFirstChild = true   

  // 使用迭代，时间复杂度保持在 O(n)
  while (stack.length) {
    const poped = stack.pop()
    if (!poped) continue

    const [node, level, parent, remainingExpandLevel] = poped
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
      isFirstChild: isFirstChild,
      selected: false,
      active: false
    }
    res.push(newFlattenedNode)

    isFirstChild = false

    // 处理展开层级，将子元素的后代依次逆序入栈
    if (remainingExpandLevel > 0 && children.length > 0) {
      newFlattenedNode.isOpen = true
      for (let i = children.length - 1; i >= 0; i--) {
        const childNode = children[i]
        if (typeof childNode !== 'object' || childNode === null) continue
        const nextLevel = level + 1
        i == 0 && (isFirstChild = true)
        stack.push([childNode, nextLevel, newFlattenedNode, remainingExpandLevel - 1])
      }
    }
  }

  return res
}

/**
 * forWord: 根据 key 找到一个节点
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