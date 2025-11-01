import React, { useState } from 'react'
import { ButtonType } from "./type"
import defaultProperties from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { UrpIcon } from '../Icon/index.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'
import './style.less'

export default function UrpButton(props: ButtonType) {
  const mergedProps = { ...defaultProperties, ...props }
  const [showActiveBgEl, setShowActiveBgEl] = useState(false)
  const [activeBgStyle, setActiveBgStyle] = useState({})
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
  let showActiveBgElTimer: ReturnType<typeof setTimeout> | undefined
  // 优先显示已属性形式传进来的内容
  mergedProps.content = mergedProps.content ?? mergedProps.children

  const btnClicked = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mergedProps.disabled || mergedProps.loading) return
    if (showActiveBgEl) {
      clearTimeout(showActiveBgElTimer)
    }

    const native = e.nativeEvent as MouseEvent
    const buttonEl = e.currentTarget
    const rect = buttonEl.getBoundingClientRect()
    const { clientX, clientY } = e
    const relativeX = clientX - rect.left
    const relativeY = clientY - rect.top

    setShowActiveBgEl(true)
    showActiveBgElTimer = setTimeout(() => {
      setShowActiveBgEl(false)
    }, 250)
    setActiveBgStyle(genStyleFromPrpos({ relativeX, relativeY }))
    if (typeof mergedProps.onClick === 'function') {
      mergedProps.onClick(native)
    }
  }

  return (
    <div 
      onClick={btnClicked} 
      className={buttonClass}
    >
      <div style={{'position': 'relative', 'zIndex': 2}}>
        {
        mergedProps.icon &&
        <UrpIcon style={{'marginRight': '4px'}} type={mergedProps.icon} />
        }
        <span>{ mergedProps.content }</span>
      </div>
      
      {
        showActiveBgEl &&
        <div style={activeBgStyle} className="urp-button-active-bg"></div>
      }
    </div>
  )
}
