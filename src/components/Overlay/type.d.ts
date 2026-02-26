export interface Overlay {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  content?: React.ReactNode;
  zIndex?: number;
  attach?: string;
  visible?: boolean;
  destoryOnClose?: boolean;
  onClick?: () => void;
}
