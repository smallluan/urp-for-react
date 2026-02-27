import { UOverlay } from "../Overlay/index.ts"
import { Loading } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { USpace } from "../Space/index.ts"
import "./style.less"
import { useMemo, useState, useEffect } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"

const ULoading = (props: Loading) => {
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'visible', 'attach', 'zIndex',
      'text', 'showOverlay', 'lazy'
    ]
  )

  const [displayVisible, setDisplayVisible] = useState(false)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (_props.visible) {
      const delay = _props.lazy ?? 0
      const id = setTimeout(() => setDisplayVisible(true), delay)
      setTimerId(id)
    } else {
      timerId && clearTimeout(timerId)
      setDisplayVisible(false)
    }

    return () => timerId && clearTimeout(timerId)
  }, [_props.visible, _props.lazy, timerId])

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
      visible={displayVisible}
      zIndex={_props.zIndex}
      attach={_props.attach}
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