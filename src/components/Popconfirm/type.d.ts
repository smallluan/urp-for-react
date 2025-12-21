export interface Popconfirm {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  theme?: 'primary' | 'success' | 'warning' | 'error';
  icon?: string | React.ReactNode;
  title: string;
  description?: string;
  arrow?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'click' | 'hover';
  cancelBtn?: null | undefined | boolean | string | Record<string, any>;
  confirmBtn?: null | undefined | boolean | string | Record<string, any>;
  onConfirm: () => void;
  onCancel: () => void;
}
