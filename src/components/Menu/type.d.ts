import { ReactElement } from "react";
import { Popup } from "../Popup/type"

export interface Menu {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactElement<SubMenu> | ReactElement<MenuItem> | ReactElement<SubMenu>[] | ReactElement<MenuItem>[];
  onChange?: () => void;
  onExpand?: () => void;
}

export interface SubMenu {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  icon?: string;
  popupProps?: Popup;
  title?: React.ReactNode;
  value?: string;
}

export interface MenuItem {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  href?: '';
  target?: '_blank' | '_self' | '_parent' | '_top';
  value?: string;
  onClick?: (value: MenuItem['value']) => void;
}
