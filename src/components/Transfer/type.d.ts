import { Value } from "../CheckBox/type"

/** 穿梭框可选的穿梭方向类型 */
type TransferDirection = 'left' | 'right' | 'both'

/** 列表项类型 */
export interface ListItem {
  value: Value,
  label?: React.ReactNode,
}

/** 非受控属性类型 */
export interface TransferUncontroledPropsType {
  data?: Array<ListItem>,
  defaultChecked?: Array<ListItem>,
  defaultValue?: Array<ListItem>,
  showCheckAll?: boolean,
  direction?: TransferDirection,
  beforeTransfer?: (direction: TransferDirection) => boolean,
}

/** 受控属性类型 */
export interface TransferControledPropsType {
  checked?: Array<ListItem>,
  value?: Array<ListItem>
}

export type TransferPropsType = TransferUncontroledPropsType & TransferControledPropsType
