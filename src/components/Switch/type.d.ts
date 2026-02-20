export interface SwitchType {
  className?: string;
  style?: React.CSSProperties;
  state?: boolean;
  defaultState?: boolean;
  loading?: boolean;
  disabled?: boolean;
  shape?: 'round' | 'rect';
  desc?: string[];
  descIcon?: string[];
  descPos?: 'inner' | 'outer';
  size?: 'normal' | 'small' | 'large';
  beforeStateChange?: (...args: any[]) => void;
  onStateChange?: (newState: boolean) => void;
}
