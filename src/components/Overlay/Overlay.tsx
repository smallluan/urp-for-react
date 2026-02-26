import { Overlay } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import useAnimatedVisibility from "../utils/hooks/useAnimatedVisibility.ts"
import PortalContainer from "../utils/tools/portal.tsx"

import "./style.less"
import { isValidElement, useMemo, useEffect, useRef } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"

const UOverlay = (props: Overlay) => {
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'zIndex', 'attach',
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
        hide: !_props.destoryOnClose && !displayOverlay
      },
      'u-overlay',
      'u-overlay',
      _props.className
    )
  }, [displayOverlay, overlayVisible, _props.destoryOnClose, _props.className])

  // ===================== 防滚动穿透核心逻辑 =====================
  const originalStyleRef = useRef<{
    overflow: string
    paddingRight: string
  } | null>(null)
  const touchMoveHandlerRef = useRef<((e: TouchEvent) => void) | null>(null)

  const getTargetContainer = () => {
    let target: HTMLElement | null = document.body
    if (typeof _props.attach === 'string') {
      target = document.getElementById(_props.attach)
    } else if (_props.attach && !isValidElement(_props.attach)) {
      target = _props.attach as unknown as HTMLElement
    }
    return target || document.body
  }

  useEffect(() => {
    const targetContainer = getTargetContainer()

    if (displayOverlay) {

      originalStyleRef.current = {
        overflow: targetContainer.style.overflow,
        paddingRight: targetContainer.style.paddingRight
      }

      targetContainer.style.overflow = 'hidden'
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollBarWidth > 0) {
        targetContainer.style.paddingRight = `${scrollBarWidth}px`
      }

      touchMoveHandlerRef.current = (e: TouchEvent) => {
        e.preventDefault()
      }
      targetContainer.addEventListener('touchmove', touchMoveHandlerRef.current, { passive: false })
    } else {

      if (originalStyleRef.current && targetContainer) {
        targetContainer.style.overflow = originalStyleRef.current.overflow
        targetContainer.style.paddingRight = originalStyleRef.current.paddingRight
      }
      if (touchMoveHandlerRef.current && targetContainer) {
        targetContainer.removeEventListener('touchmove', touchMoveHandlerRef.current)
        touchMoveHandlerRef.current = null
      }
    }

    return () => {
      const targetContainer = getTargetContainer()
      if (originalStyleRef.current && targetContainer) {
        targetContainer.style.overflow = originalStyleRef.current.overflow
        targetContainer.style.paddingRight = originalStyleRef.current.paddingRight
      }
      if (touchMoveHandlerRef.current && targetContainer) {
        targetContainer.removeEventListener('touchmove', touchMoveHandlerRef.current)
      }
      originalStyleRef.current = null
      touchMoveHandlerRef.current = null
    }
  }, [displayOverlay, _props.attach]) 

  return (
    <PortalContainer target={
      typeof _props.attach === 'string'
        ? document.getElementById(_props.attach)
        : isValidElement(_props.attach)
         ? _props.attach as unknown as HTMLElement
         : document.body
      }>
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
    </PortalContainer>
  )
}

export default UOverlay