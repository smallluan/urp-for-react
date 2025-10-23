import type { PropertiesType, LineType, DividerProps } from "./type"
import { Layout } from '../utils/types/index.ts'

export const lineDefaultProps: LineType = {
  layout: Layout.HORIZONTAL,
  dashed: false,
  color: 'gray',
  slope: false,
  flex: 1,
}

const defaultProperties: PropertiesType = {
  align: 'center',
  space: '8px',
  ...lineDefaultProps
}

/**
 * 此处处理各个 prop 之间的约束关系
 * @param props - 传进来的 props
 */
export function formateProps({ children, ...props }: DividerProps): PropertiesType {
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
  }

  return props
}

export default defaultProperties
