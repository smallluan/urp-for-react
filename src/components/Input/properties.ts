import InputType from "./type"

const defaultProperties: Required<InputType> = {
  align: 'left',
  autoWidth: false,
  disabled: false,
  maxlength: -1,
  placeholder: '请输入',
  readonly: false,
  value: '',
  clearable: false,
  size: 'normal',
  shape: 'rect',
}

export default defaultProperties

export const formatProps = (props: Required<InputType>) => {
  if (props.maxlength === 0) {
    props.disabled = true
  }
  return props
}
