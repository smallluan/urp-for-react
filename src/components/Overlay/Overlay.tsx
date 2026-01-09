import { Overlay } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"

import "./style.less"
import { useEffect, useMemo, useRef, useState } from "react"
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

  // 定时器 ref
  const timer = useRef<NodeJS.Timeout | null>(null)
  // requestAnimationFrame ref
  const rafRef = useRef<number | null>(null)

  // 两个变量实现淡入淡出（支持销毁时淡入淡出）
  const [displayOverlay, setDisplayOverlay] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [])
  
  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    if (_props.visible) {
      setDisplayOverlay(true)
      
      rafRef.current = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setOverlayVisible(true)
          rafRef.current = null
        })
        
      })
    }
    else {
      setOverlayVisible(false)

      timer.current = setTimeout(() => {
        setDisplayOverlay(false)
        timer.current = null
      }, 200)
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [_props.visible])

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
      'u-overlay' + (_props.className ? ` ${_props.className}` : '') 
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
