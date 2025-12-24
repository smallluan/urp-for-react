import { useMemo } from "react"
import { UPopup } from "../Popup/index.ts"
import { Tooltip } from "./type"
import genClassNameFromProps from "../utils/tools/className.ts"
import "./style.less"

const UTooltip = (props: Tooltip) => {

  const tooltipClass = useMemo(() => {
    return genClassNameFromProps(
      { theme: props.theme || 'default' },
      'u-tooltip',
      'u-tooltip'
    ) + (props.className ? ` ${props.className}` : '')
  }, [props.theme])

  return (
    <UPopup
      content={props.content} 
      trigger={props.trigger}
      position={props.position}
      arrow={props.arrow}
      contentClassName={tooltipClass}
      contentStyle={props.style || {}}
    >
      {props.children}
    </UPopup>
  )
}

export default UTooltip
