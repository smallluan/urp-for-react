import { Ref } from "react"

export interface Popup {
  className?: string,
  contentClassName?: string,
  style?: React.CSSProperties,
  contentStyle?: React.CSSProperties,
  absolute?: boolean,
  position?: 'bottom' | 'top' | 'left' | 'right',
  arrow?: boolean,
  hide?: 'mouseLeave' | 'clickOutter' | boolean,
  trigger?: 'hover' | 'click'
  content?: React.ReactNode,
  visible?: boolean,
  children?: React.ReactNode
  onChange?: (visible: boolean) => void,
  onMouseEnter?: () => void,
  onClickOut?: () => void,
}
