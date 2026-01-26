export type Option = { label: string, value: string | number }
type OptionValue = Option['value']
type Value = OptionValue | OptionValue[]

export interface Select {
  className?: string;
  style?: React.CSSProperties;
  value?: Value,
  defaultValue?: string | string[],
  options:  Option[],  // options 必传
  multiple?: boolean,
  borderless?: boolean,
  position?: 'bottom' | 'top' | 'left' | 'right',
  clearable?: boolean,
  hideRadioCircle?: boolean,
  hideSelected?: boolean,
  inputable?: boolean,
  cancleable?: boolean,
  selectLimit?: number,
  maxVisibleNum?: number,
  size?: 'normal' | 'small' | 'large'
  onChange?: (newValue: Select['value']) => void
}

export interface Context {
  multiple: Select['multiple'],
  options: Select['options'],
  defaultValue: Select['defaultValue'],
  value: Select['value'],
  isFocus: boolean,
  mouseEnter: boolean,
  clearable: Select['clearable'],
  hideRadioCircle: Select['hideRadioCircle'],
  hideSelected: Select['hideSelected'],
  cancleable: Select['cancleable'],
  selectLimit: Select['selectLimit'],
  onChange: Select['onChange'],
  setMouseFocus: (newValue: boolean) => void,
  onClearValue: () => void
}
