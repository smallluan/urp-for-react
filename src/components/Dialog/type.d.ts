import { Button } from "../Button/type"

export interface Dialog {
  className?: string;
  style?: React.CSSProperties;
  cancelBtn?: string | boolean | Button;
  confirmBtn?: string | boolean | Button;
  closeBtn?: string | boolean | Button;
  visible?: boolean;
  children?: React.ReactNode;
  destoryOnClose?: boolean;
  zIndex?: number;
  attachBody?: boolean;
  onCloseBtnClick?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  onOverlayClick?: () => void;
  onEscKeydown?: () => void;
}
