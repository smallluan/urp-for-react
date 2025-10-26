import { PropertiesType, LineType, DividerType } from "./type"
import { Layout } from '../utils/types/index.ts'
import { UrpColor } from "../utils/styles/index.ts"

// Line 子组件需要提取的属性名
export const linePropsCode: Array<keyof LineType> = ['layout', 'dashed', 'color', 'slope']
// Line 子组件属性默认值
export const lineDefaultProps: LineType = {
  layout: Layout.HORIZONTAL,
  dashed: false,
  color: UrpColor['urp-font-3'],
  slope: false,
  flex: 1,
}

// Divider 组件的全部默认值
const defaultProperties: PropertiesType = {
  align: 'center',
  space: '8px',
  ...lineDefaultProps
}
export default defaultProperties

/**
 * 此处处理各个 prop 之间的约束关系
 * @param props - 传进来的 props
 */
export function formatProps({ children, ...props }: DividerType) {
  if (props.layout === Layout.HORIZONTAL) {
    // 为水平分割线时，不允许分割线倾斜
    props.slope = false
  }

  if (!Array.isArray(children)) {
    // 单个子元素时，align 属性不能设置成'around'或者'between'
    if (
      typeof props.align === 'string' && 
      ['around', 'between'].includes(props.align)
    ) {
      props.align = 'center'
    }
  } else {
    // 子元素组水平布局时， align 默认是 around
    // TODO 对 align 参数为 around 和 between 时的适配
    if (
      props.layout === Layout.HORIZONTAL &&
      !['around', 'between'].includes(props.align as string)
    ) {
      props.align = 'around'
    }
  }

  return props
}
