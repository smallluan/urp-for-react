import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ButtonType } from "./type.ts"
import defaultProperties from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { UrpIcon } from '../Icon/index.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'
import './style.less'

export default function UrpButton(props: ButtonType) {
  // 合并属性（默认属性与传入属性）
  const mergedProps = { ...defaultProperties, ...props }
  // 状态管理：使用useRef存储不需要触发渲染的变量
  const prevMouseDown = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  // 状态管理：需要触发渲染的状态
  const [showActiveBgEl, setShowActiveBgEl] = useState(false)
  const [activeBgStyle, setActiveBgStyle] = useState<React.CSSProperties>({})

  // 确定按钮内容（优先使用content属性，其次使用children）
  const buttonContent = mergedProps.content ?? mergedProps.children

  // 清理定时器副作用
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // 点击事件处理（使用useCallback记忆函数）
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (mergedProps.disabled || mergedProps.loading) return

    const currentTime = Date.now()
    // 处理激活背景的显示时长
    if (currentTime - prevMouseDown.current > 250) {
      setShowActiveBgEl(false)
    } else {
      timerRef.current = setTimeout(() => {
        setShowActiveBgEl(false)
        timerRef.current = undefined
      }, 250 - (currentTime - prevMouseDown.current))
    }

    // 触发外部点击回调
    if (typeof mergedProps.onClick === 'function') {
      mergedProps.onClick(e)
    }
  }, [mergedProps.disabled, mergedProps.loading, mergedProps.onClick])

  // 鼠标按下事件（显示激活背景）
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (mergedProps.disabled || mergedProps.loading || showActiveBgEl) return

    prevMouseDown.current = Date.now()
    const buttonEl = e.currentTarget
    const rect = buttonEl.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top

    setShowActiveBgEl(true)
    setActiveBgStyle(genStyleFromPrpos({ relativeX, relativeY }) as React.CSSProperties)
  }, [mergedProps.disabled, mergedProps.loading, showActiveBgEl])

  // 鼠标抬起事件（隐藏激活背景）
  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (mergedProps.disabled || mergedProps.loading) return

    const currentTime = Date.now()
    if (currentTime - prevMouseDown.current > 250) {
      setShowActiveBgEl(false)
    } else {
      timerRef.current = setTimeout(() => {
        setShowActiveBgEl(false)
        timerRef.current = undefined
      }, 250 - (currentTime - prevMouseDown.current))
    }
  }, [mergedProps.disabled, mergedProps.loading])

  // 生成按钮类名
  const buttonClass = genClassNameFromProps(
    {
      variant: mergedProps.variant,
      theme: mergedProps.theme,
      shape: mergedProps.shape,
      size: mergedProps.size,
      block: mergedProps.block,
      disabled: mergedProps.disabled
    },
    'urp-button',
    'urp-button'
  )

  return (
    <button
      type="button" // 明确按钮类型，避免默认提交行为
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={buttonClass}
      disabled={mergedProps.disabled || mergedProps.loading}
      aria-disabled={mergedProps.disabled || mergedProps.loading} // ARIA属性，增强可访问性
    >
      {/* 按钮内容容器 */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {mergedProps.icon && (
          <UrpIcon style={{ marginRight: '4px' }} type={mergedProps.icon} />
        )}
        <span>{buttonContent}</span>
      </div>
      
      {/* 激活背景元素 */}
      {showActiveBgEl && (
        <div 
          style={activeBgStyle} 
          className="urp-button-active-bg"
          aria-hidden="true" // 告知辅助技术忽略此元素
        />
      )}
    </button>
  )
}