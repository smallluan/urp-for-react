export interface Popup {
  className?: string,
  style?: React.CSSProperties,
  absolute?: boolean,
  position?: 'bottom' | 'top' | 'left' | 'right',
  arrow?: boolean,
  hide?: 'mouseLeave' | 'clickOutter' | boolean,
  trigger?: 'hover' | 'click'
  content?: string,
  children?: React.ReactNode
  onChange?: (visible: boolean) => void
}
