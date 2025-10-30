export interface ButtonType {
  children?: React.ReactNode,
  content?: React.ReactNode,
  variant?: 'base' | 'outline' | 'dashed' | 'text',
  theme?: 'default' | 'primary' | 'warning' | 'success' | 'error',
  shape?: 'react' | 'round',
  disabled?: boolean,
  loading?: boolean,
  block?: boolean,
  icon?: string,
  size?: 'normal' | 'small' | 'large'
}
