import { SwitchType } from "./type.ts"

/**
 * 需要区分 受控/非受控 的属性单独拿出来写类型
 * 因为 受控 属性本身就是可传可不传的
 */
type SwitchDefaultProps = Omit<SwitchType, 'state'>
type RequiredSwitchDefaultProps = Required<SwitchDefaultProps>
type MergedSwitchProps = RequiredSwitchDefaultProps & Pick<SwitchType, 'state'>

/**
 * 对于受控状态不能给初始值
 * 比如开关的 state 作为受控状态
 * 则下面的 defaultProperties 不能出现 state
 */
const defaultProperties: RequiredSwitchDefaultProps = {
  defaultState: false,
  loading: false,
  disabled: false,
  shape: 'round',
  desc: [],
  descIcon: [],
  descPos: 'inner',
  size: 'normal',
  onStateChange: () => { return },
  beforeStateChange: () => true
}

export default defaultProperties

/**
 * 此处处理各个 prop 之间的约束关系
 * @param props - 传进来的 props
 */
export const formatProps = (props: MergedSwitchProps) => {
  // 当状态为 loading 时，必然是禁用的
  if (props.loading && !props.disabled) {
    props.disabled = true
  }
  // 描述文字类型及数组长度校验
  if (!Array.isArray(props.desc)) {
    props.desc = []
  } else {
    if (props.desc.length === 1) {
      props.desc.push(props.desc[0])
    }
  }
  // 描述图标类型及数组长度校验
  if (!Array.isArray(props.descIcon)) {
    props.descIcon = []
  } else {
    if (props.descIcon.length === 1) {
      props.descIcon.push(props.descIcon[0])
    }
  }

  return props
}
