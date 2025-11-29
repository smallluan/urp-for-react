export interface SwitchType {
  state?: boolean,
  defaultState?: boolean,
  loading?: boolean,
  disabled?: boolean,
  shape?: 'around' | 'rect',
  desc?: string[],
  descIcon?: string[],
  descPos?: 'inner' | 'outer',
  size?: 'normal' | 'small' | 'large'
  beforeStateChange?: (...args: any[]) => any,
  onStateChange?: (newState: boolean) => any
}
