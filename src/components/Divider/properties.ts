import type { PropertiesType, LineType } from "./type"
import { Layout } from '../utils/types/index.ts'

export const lineDefaultProps: LineType = {
  layout: Layout.HORIZONTAL,
  dashed: false,
  color: 'gray',
  slope: false
}

const defaultProperties: PropertiesType = {
  align: 'center',
  ...lineDefaultProps
}

/**
 * 此处处理各个 prop 之间的约束关系
 * @param props - 传进来的 props
 */
export function formateProps(props: PropertiesType): PropertiesType {
  if (props.layout === Layout.HORIZONTAL) {
    // 为水平分割线时，不允许分割线倾斜
    props.slope = false
  }

  return props
}

export default defaultProperties
