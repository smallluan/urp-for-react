/** 选中后返回值类型(挂载的value可选类型) */
export type Value = string | number | null

/** 选项组类型 */
export interface CheckBoxGroupType {
  lassName?: string,
  style?: React.CSSProperties,
  defaultValue?: Value | Array<Value>
  value?: Value | Array<Value>,
  cancelable?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  name?: string,
  children?: React.ReactNode,
  multiple?: boolean,
  selectLimit?: number,
  checkedIcon?: string,
  onChange?: (value: Value | Array<Value>) => void,
}

/** 选项类型 */
export interface CheckBoxItemType {
  lassName?: string,
  style?: React.CSSProperties,
  value?: Value,
  label?: React.ReactNode,
  disabled?: boolean,
  readonly?: boolean,
  children?: React.ReactNode,
  onChange?: (checked: Value) => void,
}

export interface CheckBoxContextType {
  value: Value | Array<Value>,
  name: string,
  multiple: boolean,
  checkedIcon: string,
  isOnSelectLimit: boolean,
  onChange: (value: Value) => void,
}

/** 导出类型 */
export interface CheckBoxType {
  Group: React.FC<CheckBoxGroupType>,
  Item: React.FC<CheckBoxItemType>,
}
