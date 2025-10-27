import { SwitchType } from "./type.ts"
import './style.less'
import { useEffect, useState } from "react"
import defaultProperties from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { UrpIcon } from '../Icon/index.ts'

export default function UrpSwitch(props: SwitchType) {
  const mergedProps = { ...defaultProperties, ...props }
  const { onStateChange } = mergedProps
  const [state, setState] = useState(mergedProps.state)

  const switchClassName = genClassNameFromProps(
    { 
      state: state ? 'open' : 'close', 
      shape: mergedProps.shape,
      size: mergedProps.size,
    }, 
    'urp-switch',
    'urp-switch'
  )
  const sliderClassName = genClassNameFromProps(
    { 
      state: state ? 'open' : 'close',
      shape: mergedProps.shape
    }, 
    'urp-switch-slider', 
    'urp-switch-slider'
  )
  const descClassName = genClassNameFromProps(
    {
      state: state ? 'open' : 'close',
    },
    'urp-desc-inner',
    'urp-desc-inner'
  )
  const outterDescClassName = genClassNameFromProps(
    {
      state: state ? 'open' : 'close',
    },
    'urp-desc-outter',
    'urp-desc-outter'
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

  const displayDesc = (descPos = 'inner', iconSize = 8) => {
    if (mergedProps.descPos !== descPos) return null
    if (mergedProps.desc.length) {
      return state ? mergedProps.desc[0] : mergedProps.desc[1]
    } else if (mergedProps.descIcon.length) {
      return (
        <UrpIcon 
          size={iconSize} 
          type={state ? mergedProps.descIcon[0] : mergedProps.descIcon[1]}
        />
      )
    }
    return null
  }

  return (
    <div onClick={stateChange} className={switchClassName}>
      <div className={sliderClassName}>
        <div className={descClassName}>
          { displayDesc() }
        </div>
      </div>
      <div className={outterDescClassName}>
        { displayDesc('outter', 10) }
      </div>
    </div>
  )
}
