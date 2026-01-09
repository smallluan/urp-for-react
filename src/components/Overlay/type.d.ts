export interface Overlay {
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  attach?: string;
  visible?: boolean;
  destoryOnClose?: boolean;
  onClick?: () => void;
}
