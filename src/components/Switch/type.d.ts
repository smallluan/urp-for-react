export interface SwitchType {
  state: boolean,
  loading: boolean,
  beforeStateChange: (...args) => boolean,
  onStateChange: (newState: boolean) => any
}
