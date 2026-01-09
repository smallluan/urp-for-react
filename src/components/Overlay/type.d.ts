export interface Overlay {
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  attachBody?: boolean;
  visible?: boolean;
  destoryOnClose?: boolean;
  onClick?: () => void;
}
