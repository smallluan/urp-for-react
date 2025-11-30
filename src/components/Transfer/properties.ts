import {
  TransferUncontroledPropsType,
  TransferPropsType
} from './type'

/** 默认非受控属性值 */
export const transferUncontroledProps
: Required<TransferUncontroledPropsType> = {
  data: [],
  defaultChecked: [],
  defaultValue: [],
  showCheckAll: true,
  direction: 'both',
  beforeTransfer: () => true
}

/** 规范 props 中的约束关系 */
export const formatProps = (props: TransferPropsType)
: TransferPropsType => {
  return props
}
