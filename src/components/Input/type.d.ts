interface InputType {
  align?: 'left' | 'center' | 'right',
  autoWidth?: boolean,
  disabled?: boolean,
  maxlength?: number,
  placeholder?: string,
  readonly?: boolean,
  value?: string,
  clearable?: boolean,
  size?: 'normal' | 'small' | 'large',
  shape?: 'rect' | 'round'
  type?: 'text' | 'number' | 'url' | 'tel' | 'password',
  showCount?: boolean,
  description?: string,
  children?: React.ReactNode,
  icons?: string | string[] | React.ReactNode
}

export default InputType
