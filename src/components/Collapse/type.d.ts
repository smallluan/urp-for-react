export type Value = string | number;

export interface Collapse {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  borderless?: boolean;
  disabled?: boolean;
  defaultValue?: Array<Value>;
  value?: Array<Value>;
  defaultExpandAll?: boolean;
  expandMutex?: boolean;
  onChange?: (value: Array<Value>) => void;
}
