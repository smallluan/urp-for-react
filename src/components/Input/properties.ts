import { Input } from "./type"

const defaultProperties: Input = {
  className: '',
  style: {},
  align: 'left',
  autoWidth: false,
  disabled: false,
  maxlength: -1,
  placeholder: '请输入',
  readonly: false,
  defaultValue: '',
  clearable: false,
  size: 'normal',
  shape: 'rect',
  type: 'text',
  showCount: false,
  description: '',
  children: null,
  icons: '',
  borderless: false,
  theme: 'primary',
}

export default defaultProperties

export const formatProps = (props: Required<Input>) => {
  if (props.maxlength === 0) {
    props.disabled = true
  }
  return props
}
