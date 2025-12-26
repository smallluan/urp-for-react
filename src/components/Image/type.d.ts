type ObjectPositionHorizontal = 'left' | 'center' | 'right';
type ObjectPositionVertical = 'top' | 'center' | 'bottom';

type ObjectPosition = 
  ObjectPositionHorizontal | 
  ObjectPositionVertical |
  `${ObjectPositionHorizontal} ${ObjectPositionVertical}` |
  `${ObjectPositionVertical} ${ObjectPositionHorizontal}`;

export interface Image {
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  objectPosition?: ObjectPosition;
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
