export type ScrollAlignment = 'start' | 'end' | 'center';

export interface VirtualListConfig {
  count: number;
  size: number;
  initialScrollOffset?: number;
  overscanCount?: number;
  ignoreScrollEvent?: boolean;
  onItemsRendered?: (visibleStartIndex: number, visibleEndIndex: number) => void;
}

export interface VirtualListProps extends VirtualListConfig {
  height?: ListProps['height'];
  children?: ListProps['children'];
  onScroll?: ListProps['onScroll'];
  gap?: ListProps['gap'];
}

export interface VirtualListInstance {
  scrollToIndex: (index: number, position: ScrollAlignment) => void;
}

export interface ListProps {
  className?: string;
  style?: React.CSSProperties;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  split?: boolean;
  gap?: number;
  width?: React.CSSProperties['width'];
  height?: number;
  type?: 'normal' | 'virtual' | 'lazy';
  virtual?: VirtualListConfig;
  children?: 
    | React.ReactElement<ListItemProps> 
    | React.ReactElement<ListItemProps>[]; 
  onScroll?: (scrollOffset: number) => void;
}

export interface ListItemProps {
  className?: string;
  style?: React.CSSProperties;
  content?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
}
