export interface Input {
  className?: string;
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
  autoWidth?: boolean;
  disabled?: boolean;
  maxlength?: number;
  placeholder?: string;
  readonly?: boolean;
  value?: string;
  defaultValue?: string;
  clearable?: boolean;
  size?: 'normal' | 'small' | 'large';
  shape?: 'rect' | 'round';
  type?: 'text' | 'number' | 'url' | 'tel' | 'password';
  showCount?: boolean;
  description?: string;
  children?: React.ReactNode;
  icons?: string | string[] | React.ReactNode;
  borderless?: boolean;
  theme?: 'primary' | 'success' | 'warning' | 'error';
  onChange?: (newValue: string) => void;
  onFocus?: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
  ref?: React.ReactNode
}
