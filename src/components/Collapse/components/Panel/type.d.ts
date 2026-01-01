import { Value } from "../../type"

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
  value?: Value;
  borderless?: boolean;
  iconPlacement?: 'left' | 'right';
  expand?: boolean;
  defaultExpand?: boolean;
  onChange?: (value: Value, state: boolean) => void;
}
