import { useCallback, useMemo } from "react"
import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"
import { UIcon } from "../Icon/index.ts"

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
  hasChildren: boolean
}

const UTree = (props) => {

  // 扁平化数组
  const flatArray = useMemo(() => {
    const originData: TreeOriginalNode[] = Array.isArray(props.data) ? props.data : []
    if (originData.length === 0) return []
    const res: TreeFlattenedNode[] = []
    const stack: [TreeOriginalNode, string][] = []

    // 根节点逆序入栈，保证取出正序
    for (let i = originData.length - 1; i >= 0; i--) {
      const node = originData[i]
      if (typeof node !== 'object' || node === null) continue
      stack.push([node, '0'])
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

      res.push({ label, value, level, hasChildren: !!children.length })

      // 子节点逆序入栈，保证取出时正序
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        if (typeof child !== 'object' || child === null) continue
        stack.push([child, String(Number(level) + 1)])
      }
    }

    return res
  }, [props.data])

  // item 的动态类
  const itemStyle = useCallback((level: string) => {
    return genStyleFromProps({ level })
  }, [])

  return (
    <div className="u-tree">
      {
        flatArray.map(item => (
          <div
            className="u-tree-item"
            style={itemStyle(item.level)}
            data-value={item.value}
            data-level={item.level} 
            key={item.label}
          >
            <div className="u-tree-icon-container">
              {
                item.hasChildren &&
                <UIcon
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
