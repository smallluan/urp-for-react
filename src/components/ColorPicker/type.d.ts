export interface ColorPicker {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  defaultValue?: string;
  onChange?: (newColor: string) => void;
}
