import React from 'react'
import { Dialog } from '../Dialog/type'

type DrawerPosition = 'top' | 'bottom' | 'left' | 'right';

export interface DrawerProps {
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  attach?: string | HTMLElement;
  children?: React.ReactNode;
  content?: React.ReactNode;
  closeBtn?: Dialog['closeBtn'];
  confirmBtn?: Dialog['confirmBtn'];
  cancelBtn?: Dialog['cancelBtn'];
  destroyOnClose?: boolean;
  position?: DrawerPosition;
  zIndex?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  onCloseBtnClick?: () => void;
  onClose?: () => void;
  onEscKeydown?: () => void;
  onOverlayClick?: () => void;
}
