import { Button } from "../Button/type"

export interface Dialog {
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  title?: React.ReactNode;
  cancelBtn?: string | boolean | Button;
  confirmBtn?: string | boolean | Button;
  closeBtn?: string | boolean | Button;
  visible?: boolean;
  children?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  destoryOnClose?: boolean;
  zIndex?: number;
  attach?: string | React.ReactNode;
  onCloseBtnClick?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  onOverlayClick?: () => void;
  onEscKeydown?: () => void;
}
