import { SwitchType } from "./type.ts"

const defaultProperties: SwitchType = {
  state: false,
  loading: false,
  shape: 'around',
  onStateChange: () => {return true},
  beforeStateChange: () => true
}

export default defaultProperties
