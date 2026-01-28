export interface LinkType {
  className?: string,
  style?: React.CSSProperties,
  content?: React.ReactNode,
  children?: React.ReactNode,
  theme?: 'default' | 'primary' | 'warning' | 'success' | 'error',
  underline?: 'none' | 'display' | 'hover',
  size?: 'normal' | 'small' | 'large',
  disabled?: boolean,
  prefixIcon?: string,
  suffixIcon?: string,
  href?: string,
  target?: '_self' | '_blank' | '_top' | string,
  to?: string,
  onClick?: (e: MouseEvent) => void
}
