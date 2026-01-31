import { Popup } from "./type"

export const defaultProps: Popup = {
  className: '',
  contentClassName: '',
  style: {},
  contentStyle: {},
  position: 'bottom',
  arrow: false,
  trigger: 'hover',
  content: '',
  destoryOnClose: true,  // 默认开启关闭时销毁
}
