import { SwitchType } from "./type.ts"

const defaultProperties: SwitchType = {
  state: false,
  loading: false,
  onStateChange: () => {return true},
  beforeStateChange: () => true
}

export default defaultProperties
