import { ReactElement } from "react";
import { Popup } from "../Popup/type"

export interface MenuHead {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactElement<SubMenuHead> | ReactElement<MenuItemHead> | ReactElement<SubMenuHead>[] | ReactElement<MenuItemHead>[];
  onChange?: () => void;
  onExpand?: () => void;
}

export interface SubMenuHead {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  icon?: string;
  popupProps?: Popup;
  title?: React.ReactNode;
  value?: string;
}

export interface MenuItemHead {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  content?: React.ReactNode;
  icon?: string;
  disabled?: boolean;
  href?: '';
  target?: '_blank' | '_self' | '_parent' | '_top';
  value?: string;
  onClick?: (value: MenuItemHead['value']) => void;
}
