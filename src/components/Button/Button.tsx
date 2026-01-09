import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Button } from "./type"
import defaultProperties from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { UIcon } from '../Icon/index.ts'
import genStyleFromProps from '../utils/tools/style.ts'
import useMergedProps from '../utils/hooks/useMergedProps.ts'
import './style.less'

const ACTIVE_BG_DURATION = 250  // 背景激活时长 ms

export default function UButton(props: Button) {
  
  // 合并属性
  const {merged: _props} = useMergedProps(
    defaultProperties,
    props,
    [
      'variant', 'theme', 'shape', 'size', 'block', 'disabled', 
      'loading', 'icon', 'pureIcon', 'children', 'content',
      'className', 'style'
    ]
  )
  const { 
    variant, theme, shape, size, block, 
    disabled, loading, icon, pureIcon,
    className, style
  } = _props
  const { onClick } = props

  // 点击时背景元素相关变量
  const prevMouseDown = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [activeBg, setActiveBg] = useState<{visible: boolean; styles: React.CSSProperties}>({
    visible: false,
    styles: {}
  })

  // 确定按钮内容，children 属性优先
  const buttonContent = useMemo(() => (
    _props.children ?? _props.content
  ), [_props.content, _props.children])

  // 组件卸载时清定时器，避免内存泄漏
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  //避免定时器堆积导致异常状态
  const clearActiveBgTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  // 点击事件处理
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    clearActiveBgTimer()
    const currentTime = Date.now()

    // 处理激活背景的显示时长
    if (currentTime - prevMouseDown.current > ACTIVE_BG_DURATION) {
      setActiveBg(prev => ({...prev, visible: false}))
    } else {
      timerRef.current = setTimeout(() => {
        setActiveBg(prev => ({...prev, visible: false}))
        timerRef.current = undefined
      }, ACTIVE_BG_DURATION - (currentTime - prevMouseDown.current))
    }

    onClick?.(e)
  }, [disabled, loading, onClick, clearActiveBgTimer])

  // 鼠标按下显示激活背景
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading || activeBg.visible) return

    clearActiveBgTimer()
    prevMouseDown.current = Date.now()
    const buttonEl = e.currentTarget

    requestAnimationFrame(() => {
      const rect = buttonEl.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const relativeY = e.clientY - rect.top

      setActiveBg({
        visible: true,
        styles: genStyleFromProps({ relativeX, relativeY }),
      })
    })
  }, [disabled, loading, activeBg.visible, clearActiveBgTimer])

  // 鼠标抬起隐藏(或延时隐藏)背景，清空定时器
  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    clearActiveBgTimer()
    const currentTime = Date.now()

    if (currentTime - prevMouseDown.current > ACTIVE_BG_DURATION) {
      setActiveBg(prev => ({...prev, visible: false}))
    } else {
      timerRef.current = setTimeout(() => {
        setActiveBg(prev => ({...prev, visible: false}))
        timerRef.current = undefined
      }, ACTIVE_BG_DURATION - (currentTime - prevMouseDown.current))
    }
  }, [disabled, loading, clearActiveBgTimer])

  // 鼠标离开隐藏背景，防止激活背景不消失
  const handleMouseLeave = useCallback(() => {
    clearActiveBgTimer()
    setActiveBg({ visible: false, styles: {} })
  }, [setActiveBg, clearActiveBgTimer])

  // 生成按钮类名
  const buttonClass = useMemo(() => {
    return genClassNameFromProps(
      {
        variant: variant,
        theme: theme,
        shape: shape,
        size: size,
        block: block,
        disabled: disabled || loading,
        pureIcon: pureIcon
      },
      'u-button' + (className && ' ' + className),
      'u-button'
    )
  }, [variant, theme, shape, size, block, disabled, loading, className, pureIcon])

  // 激活背景类名：通过visible控制显隐，避免DOM反复创建销毁
  const activeBgClass = useMemo(() => {
    return genClassNameFromProps(
      { visible: activeBg.visible },
      'u-button-active-bg',
      'u-button-active-bg'
    )
  }, [activeBg.visible])

  const renderIcon = useCallback(() => {
    const iconType = loading ? 'LoadingOutlined' : icon
    if (!iconType) return null

    return (
      <UIcon
        className={`u-button-icon ${pureIcon ? '' : 'u-button-icon-with-margin'}`}
        type={iconType}
      />
    )
  }, [icon, loading, pureIcon])

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={buttonClass}
      disabled={disabled || loading}
      aria-disabled={disabled || loading} // ARIA属性，增强可访问性
      data-testid="u-button"
      style={style}
    >
      {/* 按钮内容容器 */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {renderIcon()}
        {!pureIcon &&<span>{buttonContent}</span>}
      </div>
      {/* 激活背景元素 */}
      <div 
        style={activeBg.styles} 
        className={activeBgClass}
        aria-hidden={!activeBg.visible}
      />
    </button>
  )
}
