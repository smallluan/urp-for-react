import { LinkType } from "./type"

const defaultProperties: Required<LinkType> = {
  content: '跳转链接',
  children: null,
  theme: 'primary',
  underline: 'display',
  size: 'normal',
  disabled: false,
  prefixIcon: '',
  suffixIcon: '',
  href: '',
  target: '_blank'
}

export default defaultProperties
