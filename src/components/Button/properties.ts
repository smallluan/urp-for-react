import { Button } from "./type"

const defaultProperties: Omit<Required<Button>, 'onClick'> = {
  className: '',
  style: {},
  children: null,
  content: '确定',
  variant: 'base',
  theme: 'primary',
  shape: 'rect',
  disabled: false,
  loading: false,
  block: false,
  icon: '',
  size: 'normal',
  pureIcon: false,
}

export default defaultProperties
