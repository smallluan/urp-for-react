import { useMemo } from "react"
import cloneDeep from 'lodash/cloneDeep'

// data 单节点
type TreeOriginalNode = {
  label: string;
  value?: string | number;
  children?: TreeOriginalNode[];
}

// 扁平化后的单个节点
type TreeFlattenedNode = {
  label: string;
  value?: string | number;
  level: string;
}

const UTree = (props) => {

  const flatArray = useMemo(() => {
    // 深拷贝防止直接修改 props（这块做虚拟列表的时候应该优化一下）
    const originData: TreeOriginalNode[] = cloneDeep(Array.isArray(props.data) ? props.data : [])
    const res: TreeFlattenedNode[] = []
    const stack: [TreeOriginalNode, string][] = []

    // 根节点逆序入栈，保证取出正序
    for (let i = originData.length - 1; i >= 0; i--) {
      const node = originData[i]
      if (typeof node !== 'object' || node === null) continue
      stack.push([node, String(i)])
    }

    // 深度优先， stack 后进先出，使用效率更高的 pop 和 push 方法
    while (stack.length > 0) {
      const popped = stack.pop()
      if (!popped) continue
      const [node, level] = popped
      // 字段兜底，避免 undefined
      const label = node.label ?? ''
      const value = node.value ?? ''
      const children = Array.isArray(node.children) ? node.children : []

      res.push({ label, value, level })

      // 子节点逆序入栈，保证取出时正序
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        if (typeof child !== 'object' || child === null) continue
        stack.push([child, `${level}-${i}`])
      }
    }

    return res
  }, [props.data])

  return (
    <div>
      {
        flatArray.map(item => (
          <div key={item.label}>{item.label}</div>
        ))
      }
    </div>
  )
}

export default UTree
