type Value = string | number;

export interface Collapse {
  className?: string;
  style?: React.CSSProperties;
  borderless?: boolean;
  disabled?: boolean;
  defaultValue?: Array<Value>;
  value?: Array<Value>;
  defaultExpandAll?: boolean;
  expandMutex?: boolean;
  onChange?: (value: Array<Value>) => void;
}

export interface Panel {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  content?: React.ReactNode;
  header?: React.ReactNode;
  icon?: string;
  destroyOnCollapse?: boolean;
  expandOnRowClick?: boolean;
  disabled?: boolean;
  unexpendHeight?: number;
  value: Value;
}
