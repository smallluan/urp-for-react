export interface Rate {
  className?: string;
  style?: React.CSSProperties;
  value?: number;
  defaultValue?: number;
  count?: number;
  disabled?: boolean;
  allowPartial?: boolean;
  clearable?: boolean;
  color?: string | Array<string>;
  texts?: Array<Record<number, string>>;
  gap?: number;
  size?: 'small' | 'normal' | 'large';
  onChange?: (value: number) => void
}
