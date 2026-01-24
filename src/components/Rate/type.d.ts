export interface Rate {
  className?: string;
  style?: React.CSSProperties;
  value?: number;
  defaultValue?: number;
  count?: number;
  icon?: string;
  disabled?: boolean;
  allowPartial?: boolean;
  clearable?: boolean;
  color?: string | Array<string>;
  texts?: Array<Record<number, string>>;
  gap?: number;
  size?: 'small' | 'normal' | 'large';
  onChange?: (value: number) => void;
}

export interface ContextType {
  currIconIndex: number;
  currPercentage: number;
  previewIconIndex: number;
  previewPercentage: number;
  allowPartial: boolean;
  disabled: boolean;
}
