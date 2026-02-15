export interface SwiperProps {
  className?: string;
  style?: React.CSSProperties;
  autoplay?: boolean;
  current?: number;
  defaultCurrent?: number;
  direction?: 'horizontal' | 'vertical';
  duration?: number;
  interval?: number;
  loop?: boolean;
  stopOnHover?: boolean;
  children?: React.ReactElement<SwiperItemProps> | React.ReactElement<SwiperItemProps>[]
  onChange?: (current: number) => void;
}

export interface SwiperItemProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
