import { UOverlay } from "../Overlay/index.ts"
import { Loading } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { USpace } from "../Space/index.ts"
import "./style.less"
import { useMemo } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"

const ULoading = (props: Loading) => {
  // 合并属性 
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'visible', 'attachBody', 'zIndex',
      'text', 'showOverlay'
    ]
  )

  const loadingClassName = useMemo(() => {
    return genClassNameFromProps(
      {'show-overlay': _props.showOverlay},
      'u-loading',
      'u-loading',
      _props.className
    )
  }, [_props.showOverlay, _props.className])

  return (
    <UOverlay
      className={loadingClassName}
      style={_props.style}
      visible={_props.visible}
      zIndex={_props.zIndex}
      attachBody={_props.attachBody}
      destoryOnClose
    >
      <USpace
        className="u-loading-content"
        direction="vertical"
      >
        <div className="u-loading-content-indicators">
          <div className="indicator"/>
          <div className="indicator"/>
          <div className="indicator"/>
        </div>
        <div>{_props.text}</div>
      </USpace>
    </UOverlay>
  )
}

export default ULoading
