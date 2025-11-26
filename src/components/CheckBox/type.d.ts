/** 选中后返回值类型(挂载的value可选类型) */
export type Value = string | number | null

/** 选项组类型 */
export interface CheckBoxGroupType {
  value?: Value,
  cancelable?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  name?: string,
  children?: React.ReactNode,
  onChange?: (value: Value) => void,
}

/** 选项类型 */
export interface CheckBoxItemType {
  value?: Value,
  label?: React.ReactNode,
  disabled?: boolean,
  readonly?: boolean,
  children?: React.ReactNode,
  onChange?: (checked: Value) => void,
}

export interface CheckBoxContextType {
  value: Value,
  name: string,
  onChange: (value: Value) => void,
}

/** 导出类型 */
export interface CheckBoxType {
  Group: React.FC<CheckBoxGroupType>,
  Item: React.FC<CheckBoxItemType>,
}
