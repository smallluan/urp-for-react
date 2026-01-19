import { useRef, useState } from "react"
import { USpace } from "../Space/index.ts"

import "./style.less"

const UColorPicker = () => {
  return (
    <div>colorpicker</div>
  )
}

/**
 * 颜色选择面板
 */
const UColorPickerPanel = () => {

  // 鼠标位置指示器的坐标
  const [indicatorPos, setIndicatorPos] = useState({ x: 0, y: 0 })
  // 鼠标是否在拖拽中
  const [isDragging, setIsDragging] = useState(false)

  // 色值面板 ref
  const hsvPanelRef = useRef(null)

  /**
   * 计算坐标，处理鼠标事件，返回合法的面板相对坐标
   */
  const calculateIndicatorPos = (e) => {
    const panelDom = hsvPanelRef.current
    if (!panelDom) return { x: 0, y: 0 }

    const { width, height, left, top } = panelDom.getBoundingClientRect()

    let x = e.clientX - left
    let y = e.clientY - top
    
    // 边界限制
    x = Math.max(0, Math.min(width, x))
    y = Math.max(0, Math.min(height, y))

    return { x, y }
  }

  /**
   * 色值面板鼠标按下事件处理函数
   */
  const handleMouseDown = (e) => {
    setIsDragging(true)
    const newPos = calculateIndicatorPos(e)
    setIndicatorPos(newPos)
  }

  /**
   * 色值面板鼠标移动事件处理函数
   */
  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newPos = calculateIndicatorPos(e)
    setIndicatorPos(newPos)
  }

  const handleMouseEnd = () => {
    setIsDragging(false)
  }

  return (
    <USpace
      direction="vertical"
      gap={8}
      align="start"
      className="u-color-picker-panel"
    >
      {/* 色值选择面板 */}
      <div
        ref={hsvPanelRef}
        className="u-color-picker-panel-hsv-panel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseEnd}
        onMouseLeave={handleMouseEnd}
      >
        {/* 鼠标位置指示滑块 */}
        <div
          style={{
            left: `${indicatorPos.x}px`,
            top: `${indicatorPos.y}px`,
          }}
          className="color-selector-indicator"
        />
        <div></div>
      </div>
    </USpace>
  )
}

UColorPicker.Panel = UColorPickerPanel

export default UColorPicker
