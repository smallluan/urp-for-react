export interface SwitchType {
  state?: boolean,
  loading?: boolean,
  disabled?: boolean,
  shape?: 'around' | 'rect',
  desc?: [string, string] | [],
  descIcon?: [string, string] | [],
  descPos?: 'inner' | 'outer',
  size?: 'normal' | 'small' | 'large'
  beforeStateChange?: (...args) => boolean,
  onStateChange?: (newState: boolean) => any
}
