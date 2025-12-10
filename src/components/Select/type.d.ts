export type Options = { label: string, value: string | number }

export interface Select {
  value?: string | string[],
  defaultValue?: string | string[],
  options?: Options | Options[],
  multiple?: boolean,
  borderless?: boolean,
  position?: 'bottom' | 'top' | 'left' | 'right',
  clearable?: boolean,
  hideRadioCircle?: boolean,
  hideSelected?: boolean,
  inputable?: boolean,
  onChange?: (newValue: Select['value']) => void
}

export interface Context {
  multiple: Select['multiple'],
  options: Select['options'],
  defaultValue: Select['defaultValue'],
  value: Select['value'],
  mouseFocus: boolean,
  mouseEnter: boolean,
  clearable: Select['clearable'],
  hideRadioCircle: Select['hideRadioCircle'],
  hideSelected: Select['hideSelected'],
  onChange: Select['onChange'],
  setMouseFocus: (newValue: boolean) => void,
  onClearValue: () => void
}
