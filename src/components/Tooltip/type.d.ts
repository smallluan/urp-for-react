export interface Tooltip {
  className?: string;
  style?: React.CSSProperties;
  content: string;
  trigger?: 'hover' | 'click';
  position?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: boolean;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'light';
  children: React.ReactNode;
}
