export interface Loading {
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean;
  attach?: string | React.ReactNode;
  zIndex?: number;
  text?: React.ReactNode;
  showOverlay?: boolean;
  lazy?: number;
}
