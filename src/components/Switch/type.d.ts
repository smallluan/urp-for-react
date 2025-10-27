export interface SwitchType {
  state: boolean,
  loading: boolean,
  shape: 'around' | 'react',
  beforeStateChange: (...args) => boolean,
  onStateChange: (newState: boolean) => any
}
