export interface QRCode {
  className?: string;
  style?: React.CSSProperties;
  borderless?: boolean;
  size?: 'small' | 'normal' | 'large' | number;
  renderType?: 'canvas' | 'svg';
  status?: 'active' | 'expired' | 'loading' | 'scanned';
  color?: string;
  bgColor?: string;
  value?: string;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H',
  icon?: string,
  iconSize?: number;
  onRefresh?: () => void;
}
