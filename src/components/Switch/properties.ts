import { SwitchType } from "./type.ts"

const defaultProperties: Required<SwitchType> = {
  state: false,
  loading: false,
  disabled: false,
  shape: 'around',
  desc: [],
  descIcon: [],
  descPos: 'inner',
  size: 'normal',
  onStateChange: () => {return true},
  beforeStateChange: () => true
}

export default defaultProperties

/**
 * 此处处理各个 prop 之间的约束关系
 * @param props - 传进来的 props
 */
export const formatProps = (props: Required<SwitchType>) => {
  // 当状态为 loading 时，必然是禁用的
  if (props.loading && !props.disabled) {
    props.disabled = true
  }

  return props
}
