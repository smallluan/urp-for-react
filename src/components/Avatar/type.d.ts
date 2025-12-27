import { Image } from "../Image/type"

export interface Avatar {
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  src?: string;
  imageProps?: Image;
  shape?: 'rect' | 'round';
  size?: 'normal' | 'small' | 'large'
  text?: string;
  icon?: string
}
