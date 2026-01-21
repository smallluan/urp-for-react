export interface Tag {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  content?: React.ReactNode;
  closeable?: boolean;
  theme?: 'default' | 'default-light' |
          'primary' | 'primary-light' |
          'success' | 'success-light' |
          'warning' | 'warning-light' |
          'error' | 'error-light';
  shape?: 'rect' | 'round' | 'mark' | 'arrow';
  size?: 'normal' | 'small' | 'large';
  prefixIcon?: string;
  suffixIcon?: string;
  title?: string;
  onClick?: () => void;
  onClose?: () => void;
}
