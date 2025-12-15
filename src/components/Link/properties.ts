import { LinkType } from "./type"

const defaultProperties: Required<LinkType> = {
  className: '',
  style: {},
  content: null,
  children: null,
  theme: 'primary',
  underline: 'display',
  size: 'normal',
  disabled: false,
  prefixIcon: '',
  suffixIcon: '',
  href: '',
  target: '_blank',
  to: ''
}

export default defaultProperties
