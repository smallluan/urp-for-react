export interface ButtonType {
  children?: React.ReactNode,
  content?: React.ReactNode,
  variant?: 'base' | 'outline' | 'dashed' | 'text',
  theme?: 'default' | 'primary' | 'warning' | 'success' | 'error',
  shape?: 'rect' | 'round',
  disabled?: boolean,
  loading?: boolean,
  block?: boolean,
  icon?: string,
  size?: 'normal' | 'small' | 'large',
  purIcon?: boolean,
  onClick?: (...args) => void,
}
