export interface Overlay {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  content?: React.ReactNode;
  zIndex?: number;
  attachBody?: boolean;
  visible?: boolean;
  destoryOnClose?: boolean;
  onClick?: () => void;
}
