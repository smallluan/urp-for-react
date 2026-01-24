import { Overlay } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import useAnimatedVisibility from "../utils/hooks/useAnimatedVisibility.ts"

import "./style.less"
import { useMemo } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"

const UOverlay = (props: Overlay) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'zIndex', 'attachBody',
      'visible', 'destoryOnClose', 'onClick', 'children', 'content'
    ]
  )

  // 支持 destoryOnClose
  const {
    display: displayOverlay,
    visible: overlayVisible
  } = useAnimatedVisibility(_props.visible, 200)

  const overlayClassName = useMemo(() => {
    return genClassNameFromProps(
      {
        display: displayOverlay,
        visible: overlayVisible,
        body: _props.attachBody,
        container: !_props.attachBody,
        hide: !_props.destoryOnClose && !displayOverlay
      },
      'u-overlay',
      'u-overlay',
      _props.className
    )
  }, [displayOverlay, overlayVisible, _props.attachBody, _props.destoryOnClose, _props.className])

  return (
    <>
      {
        (
          (_props.destoryOnClose && displayOverlay) ||
          !_props.destoryOnClose
        ) &&
        <div
          style={{
            zIndex: _props.zIndex,
            ..._props.style
          }}
          onClick={_props.onClick}
          className={overlayClassName}
        >
          {_props.children || _props.content}
        </div>
      }
    </>
  )
}

export default UOverlay
