import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { USpace } from "../Space/index.ts"
import { USlider } from "../Slider/index.ts"
import { UGrid } from "../Grid/index.ts"
import { positionToSv, hsvToRgb } from "./utils.ts"

import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"

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
  // 色相
  const [hue, setHue] = useState(0)

  // 色值面板 ref
  const hsvPanelRef = useRef(null)

  /**
   * 计算坐标，处理鼠标事件，返回合法的面板相对坐标
   */
  const calculateIndicatorPos = useCallback((e) => {
    const panelDom = hsvPanelRef.current
    if (!panelDom) return { x: 0, y: 0 }

    const { width, height, left, top } = panelDom.getBoundingClientRect()

    let x = e.clientX - left
    let y = e.clientY - top
    
    // 边界限制
    x = Math.max(0, Math.min(width, x))
    y = Math.max(0, Math.min(height, y))

    return { x, y }
  }, [])


  /**
   * 色值面板鼠标按下事件处理函数
   */
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true)
    const newPos = calculateIndicatorPos(e)
    setIndicatorPos(newPos)
  }, [calculateIndicatorPos])


  /**
   * 色值面板鼠标移动事件处理函数
   */
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    const newPos = calculateIndicatorPos(e)
    setIndicatorPos(newPos)
  }, [isDragging, calculateIndicatorPos])

  const handleMouseEnd = useCallback(() => {
    setIsDragging(false)
  }, [])


  /**
   * 处理色相变化
   */
  const handleHueChange = useCallback((sliderValue: number) => {
    const newHue = Number(sliderValue)
    const validHue = Math.max(0, Math.min(360, newHue))

    setHue(validHue)
  }, [])


  /**
   * 将色值面板的指示器位置映射为 s 和 v
   */
  const { s, v } = useMemo(() => {
    const panelDom = hsvPanelRef.current
    if (!panelDom) return { s: 0, v: 1 }

    const { width, height } = panelDom.getBoundingClientRect()

    return positionToSv(width, height, indicatorPos)
  }, [indicatorPos])

  /**
   * 当前颜色: RGB
   */
  const rgbColor = useMemo(() => {
    const { r, g, b } = hsvToRgb(hue, s, v)
    return `rgb(${r}, ${g}, ${b})`
  }, [hue, s, v])



  /**
   * hue slider 动态 style
   */
  const colorPickerStyle = useMemo(() => {
    return genStyleFromProps(
      {
        'hue': `hsl(${hue}, 100%, 50%)`,
        'preview-color': rgbColor
      }
    )
  }, [hue, rgbColor])


  /**
   * 支持鼠标拖动到面板外
   */
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseEnd)
    }
  }, [isDragging, handleMouseMove, handleMouseEnd])

  return (
    <USpace
      direction="vertical"
      gap={16}
      align="start"
      className="u-color-picker-panel"
      style={colorPickerStyle}
    >
      {/* 色值选择面板 */}
      <div
        ref={hsvPanelRef}
        className="u-color-picker-panel-hsv-panel"
        onMouseDown={handleMouseDown}
      >
        {/* 鼠标位置指示滑块 */}
        <div
          style={{
            left: `${indicatorPos.x}px`,
            top: `${indicatorPos.y}px`,
          }}
          className="u-color-picker-panel-hsv-panel-indicator"
        />
      </div>
      {/* 色相选择器 */}
      <UGrid.Row justify="space-between" align="center">
        <USlider
          className="u-color-picker-panel-hue-slider"
          showLabel={false}
          max={360}
          onChange={handleHueChange}
        />
        <div className="u-color-picker-panel-color-preview"/>
      </UGrid.Row>
    </USpace>
  )
}

UColorPicker.Panel = UColorPickerPanel

export default UColorPicker
