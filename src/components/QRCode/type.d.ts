export interface QRCode {
  className?: string;
  style?: React.CSSProperties;
  borderless?: boolean;
  size?: 'small' | 'normal' | 'large';
  renderType?: 'canvas' | 'svg';
  status?: 'active' | 'expired' | 'loading' | 'scanned';
  color?: string;
  bgColor?: string;
  value?: string;
}
