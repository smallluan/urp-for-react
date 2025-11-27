import {CheckBoxGroupType, CheckBoxItemType, Value} from './type'

export const groupDefaultProperties: Required<CheckBoxGroupType> = {
  value: '',
  cancelable: false,
  disabled: false,
  readonly: false,
  name: '',
  children: null,
  multiple: false,
  onChange: (value: Value) => {return value},
}

export const itemDefaultProperties: Required<CheckBoxItemType> = {
  value: '',
  label: '选项一',
  disabled: false,
  readonly: false,
  children: null,
  onChange: (value: Value) => {return value},
}