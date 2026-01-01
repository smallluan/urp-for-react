import { Panel } from "./type"

const defaultProps: Panel = {
  className: '',
  style: {},
  children: null,
  content: null,
  header: null,
  icon: '',
  destroyOnCollapse: false,
  expandOnRowClick: true,
  disabled: false,
  borderless: false,
  defaultExpand: false,
  iconPlacement: 'left'
}

export default defaultProps
