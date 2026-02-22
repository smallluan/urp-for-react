import React, { ReactElement } from "react";
import { Popup } from "../Popup/type"

type Value = string | number;

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
  value?: Value;
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
  value?: Value;
  onClick?: (value: MenuItemHead['value']) => void;
}

export interface Menu {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactElement<SubMenu> | ReactElement<MenuItem> | ReactElement<SubMenu>[] | ReactElement<MenuItem>[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  defaultValue?: Value;
  value?: Value;
  expand?: Value[];
  defaultExpand?: Value[];
  onChange?: (value: Value) => void;
}

export interface SubMenu {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactElement<SubMenu> | ReactElement<MenuItem> | ReactElement<SubMenu>[] | ReactElement<MenuItem>[];
  icon?: string;
  title?: string;
  value?: Value; 
}

export interface MenuItem {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  content?: React.ReactNode;
  icon?: string;
  value?: Value;
}
