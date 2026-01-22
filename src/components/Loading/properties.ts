import { Loading } from "./type"

export const defaultProps: Loading = {
  className: '',
  style: {},
  visible: false,
  attachBody: true,
  zIndex: 3000,  // 默认层级高度 3000
  text: '加载中',
  showOverlay: true
}
