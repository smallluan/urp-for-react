import { ButtonType } from "./type"

const defaultProperties: Required<ButtonType> = {
  children: '',
  content: '确定',
  variant: 'base',
  theme: 'primary',
  shape: 'react',
  disabled: false,
  loading: false,
  block: false,
  icon: '',
  size: 'normal',
  onClick: () => { return },
}

export default defaultProperties
