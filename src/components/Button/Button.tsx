import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { ButtonType } from "./type.ts"
import defaultProperties from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { UrpIcon } from '../Icon/index.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'
import './style.less'

export default function UrpButton(props: ButtonType) {
  // 合并属性（默认属性与传入属性）
  const mergedProps = { ...defaultProperties, ...props }
  const { variant, theme, shape, size, block, disabled, loading, icon, onClick } = mergedProps
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
    if (disabled || loading) return

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
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }, [disabled, loading, onClick])

  // 鼠标按下事件（显示激活背景）
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading || showActiveBgEl) return

    prevMouseDown.current = Date.now()
    const buttonEl = e.currentTarget
    const rect = buttonEl.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top

    setShowActiveBgEl(true)
    setActiveBgStyle(genStyleFromPrpos({ relativeX, relativeY }) as React.CSSProperties)
  }, [disabled, loading, showActiveBgEl])

  // 鼠标抬起事件（隐藏激活背景）
  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    const currentTime = Date.now()
    if (currentTime - prevMouseDown.current > 250) {
      setShowActiveBgEl(false)
    } else {
      timerRef.current = setTimeout(() => {
        setShowActiveBgEl(false)
        timerRef.current = undefined
      }, 250 - (currentTime - prevMouseDown.current))
    }
  }, [disabled, loading])

  // 生成按钮类名
  const buttonClass = useMemo(() => {
    return genClassNameFromProps(
      {
        variant: variant,
        theme: theme,
        shape: shape,
        size: size,
        block: block,
        disabled: disabled || loading
      },
      'urp-button',
      'urp-button'
    )
  }, [variant, theme, shape, size, block, disabled, loading])

  return (
    <button
      type="button" // 明确按钮类型，避免默认提交行为
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={buttonClass}
      disabled={disabled || loading}
      aria-disabled={disabled || loading} // ARIA属性，增强可访问性
    >
      {/* 按钮内容容器 */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {icon && !loading && (
          <UrpIcon style={{ marginRight: '4px' }} type={icon} />
        )}
        {
          loading && 
          <UrpIcon style={{ marginRight: '4px' }} type="LoadingOutlined" />
        }
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
