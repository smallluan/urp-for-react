import { LinkType } from "./type"

const defaultProperties: Required<LinkType> = {
  content: null,
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
