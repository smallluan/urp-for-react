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
}

export default InputType
