export interface LinkType {
  content?: React.ReactNode,
  children?: React.ReactNode,
  theme?: 'default' | 'primary' | 'warning' | 'success' | 'error',
  underline?: 'none' | 'display' | 'hover',
  size?: 'normal' | 'small' | 'large',
  disabled?: boolean,
  prefixIcon?: string,
  suffixIcon?: string,
  href?: string,
  target?: '_self' | '_blank' | '_blank' | '_top' | string
}
