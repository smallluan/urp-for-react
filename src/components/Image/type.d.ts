export interface Image {
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  src?: string;
  fallback?: string;
  lazy?: boolean;
  shape?: 'rect' | 'round';
  loading?: React.ReactNode;
  error?: React.ReactNode;
  overlayContent?: React.ReactNode;
  overlayTrigger?: 'always' | 'hover' | boolean;
  onError?: () => void;
  onLoad?: () => void;
}
