
import React, { ReactElement } from 'react'

/* 主容器类型 */
export interface Anchor {
  className?: string;
  style?: React.CSSProperties;
  container?: string;
  cursor?: React.ReactNode;
  size?: 'normal' | 'small' | 'large';
  scrollOffset?: number;
  children?: ReactElement<AnchorItem> | ReactElement<AnchorItem>[] | null;
  onChange?: () => void;
  onClick?: () => void;
}

/* 锚点项类型 */
export interface AnchorItem {
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  title?: string;
  children: React.ReactNode;
  anchorIndex?: number;  // 组件内部添加，开发者使用时不用手动添加
  scrollOffset?: number;  // 组件内部添加，开发者使用时不用手动添加
}

/* 锚点目标类型 */
export interface AnchorTarget {
  className?: string;
  style?: React.CSSProperties;
  id: string;
  children: React.ReactNode;
}

/* 上下文类型 */
export interface Context {
  currAnchor: number;
  scrollOffset: number;
  handleClick: (newAnchor: number) => void;
}

/* 锚点项被点击时的 event 类型 */
export interface AnchorItemClickEvent extends React.MouseEvent<HTMLAnchorElement, MouseEvent> {}

