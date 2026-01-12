export interface Tabs {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  theme?: 'curse' | 'card';
  value?: number | string;
  defaultValue?: number | string;
  onChange?: (value: Tabs['value']) => void;
}

export interface TabsPanel {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  content?: React.ReactNode;
  label?: React.ReactNode;
  value: number | string;
}
