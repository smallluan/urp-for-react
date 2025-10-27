export interface SwitchType {
  state: boolean,
  loading: boolean,
  shape: 'around' | 'react',
  desc: [string, string] | [],
  descIcon: [string, string] | [],
  descPos: 'inner' | 'outter',
  size: 'normal' | 'small' | 'large'
  beforeStateChange: (...args) => boolean,
  onStateChange: (newState: boolean) => any
}
