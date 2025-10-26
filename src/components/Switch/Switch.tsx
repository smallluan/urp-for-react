import { SwitchType } from "./type.ts"
import './style.less'
import { useEffect, useState } from "react"
import defaultProperties from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"

export default function UrpSwitch(props: SwitchType) {
  const mergedProps = { ...defaultProperties, ...props }
  const { onStateChange } = mergedProps
  const [state, setState] = useState(mergedProps.state)

  const switchClassName = genClassNameFromProps(
    { state: state ? 'open' : 'close' }, 
    'urp-switch',
    'urp-switch'
  )
  const sliderClassName = genClassNameFromProps(
    { state: state ? 'open' : 'close' }, 
    'urp-switch-slider', 
    'urp-switch-slider'
  )

  useEffect(() => {
    onStateChange?.(state)
  }, [state, onStateChange])

  function stateChange() {
    const canIChangeState = mergedProps.beforeStateChange?.() || false
    if (canIChangeState) {
      setState(!state)
    }
  }

  return (
    <div onClick={stateChange} className={switchClassName}>
      <div className={sliderClassName}></div>
      <div className="urp-switch-label">{ state }</div>
    </div>
  )
}
