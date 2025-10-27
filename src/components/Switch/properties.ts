import { SwitchType } from "./type.ts"

const defaultProperties: SwitchType = {
  state: false,
  loading: false,
  shape: 'around',
  desc: [],
  descIcon: [],
  descPos: 'inner',
  size: 'normal',
  onStateChange: () => {return true},
  beforeStateChange: () => true
}

export default defaultProperties
