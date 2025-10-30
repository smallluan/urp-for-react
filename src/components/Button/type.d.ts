export interface ButtonType {
  variant?: 'base' | 'outline' | 'dashed' | 'text',
  theme?: 'default' | 'primary' | 'warning' | 'success' | 'error',
  shape?: 'react' | 'round',
  disabled?: boolean,
  loading?: boolean,
  block?: boolean,
  icon?: string,
  size?: 'normal' | 'small' | 'large'
}
