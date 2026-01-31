export interface Popup {
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  absolute?: boolean;
  position?: 'bottom' | 'top' | 'left' | 'right';
  arrow?: boolean;
  trigger?: 'hover' | 'click' | 'rightClick';
  content?: React.ReactNode;
  visible?: boolean;
  children?: React.ReactNode;
  destoryOnClose?: boolean;
  onChange?: (visible: boolean) => void;
  onMouseEnter?: () => void;
  onClickOut?: () => void;
}
