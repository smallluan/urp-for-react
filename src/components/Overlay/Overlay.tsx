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

  // ===================== 防滚动穿透 =====================
  const originalStyleRef = useRef<{
    overflow: string
    paddingRight: string
  } | null>(null)
  const touchMoveHandlerRef = useRef<((e: TouchEvent) => void) | null>(null)
  // 获取Overlay根元素的ref，用于判断元素是否在内部
  const overlayRootRef = useRef<HTMLDivElement>(null)

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
      // PC端：禁止背景滚动
      originalStyleRef.current = {
        overflow: targetContainer.style.overflow,
        paddingRight: targetContainer.style.paddingRight
      }
      targetContainer.style.overflow = 'hidden'
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollBarWidth > 0) {
        targetContainer.style.paddingRight = `${scrollBarWidth}px`
      }

      // 只判断是否是Overlay内部元素
      touchMoveHandlerRef.current = (e: TouchEvent) => {
        const target = e.target as HTMLElement
        // 只要触发元素是Overlay内部的子元素，就放过（不阻止默认行为）
        if (overlayRootRef.current?.contains(target)) return
        // 只有外部元素，才阻止滚动穿透
        e.preventDefault()
      }
      targetContainer.addEventListener('touchmove', touchMoveHandlerRef.current, { passive: false })
    } else {
      // 恢复样式和移除监听
      if (originalStyleRef.current && targetContainer) {
        targetContainer.style.overflow = originalStyleRef.current.overflow
        targetContainer.style.paddingRight = originalStyleRef.current.paddingRight
      }
      if (touchMoveHandlerRef.current && targetContainer) {
        targetContainer.removeEventListener('touchmove', touchMoveHandlerRef.current)
        touchMoveHandlerRef.current = null
      }
    }

    // 组件卸载清理
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

  // Portal的target
  const portalTarget = useMemo(() => {
    if (typeof _props.attach === 'string') {
      return document.getElementById(_props.attach) || document.body
    }
    return _props.attach && !isValidElement(_props.attach) 
      ? (_props.attach as unknown as HTMLElement) 
      : document.body
  }, [_props.attach])

  return (
    <PortalContainer target={portalTarget}>
      {
        (
          (_props.destoryOnClose && displayOverlay) ||
          !_props.destoryOnClose
        ) &&
        <div
          ref={overlayRootRef}
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