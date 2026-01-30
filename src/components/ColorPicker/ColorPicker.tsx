import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { USpace } from "../Space/index.ts"
import { USlider } from "../Slider/index.ts"
import { UGrid } from "../Grid/index.ts"
import { USelect } from "../Select/index.ts"
import { UInput } from "../Input/index.ts"
import { positionToSv, hsvToRgb, hsvToHex ,extractRgbValues, hexToRgb, rgbToHsv, svToPosition } from "./utils.ts"

import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"

const valueType = [
  { label: 'HEX', value: 'HEX' },
  { label: 'RGB', value: 'RGB' },
  { label: 'CSS', value: 'CSS' }
]

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
  // Slider专属受控状态
  const [hueSliderValue, setHueSliderValue] = useState(0)
  // 当前颜色格式(默认是 16 进制格式)
  const [currValueType, setCurrValueType] = useState('HEX')

  // 16进制色值输入框的值
  const [hexInputValue, setHexInputValue] = useState('')


  // 色值面板 ref
  const hsvPanelRef = useRef<HTMLElement>(null)

  /**
   * 计算坐标，处理鼠标事件，返回合法的面板相对坐标
   */
  const calculateIndicatorPos = useCallback((e: React.MouseEvent) => {
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
  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsDragging(true)
    const newPos = calculateIndicatorPos(e)
    setIndicatorPos(newPos)
  }, [calculateIndicatorPos])


  /**
   * 色值面板鼠标移动事件处理函数
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
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
   * 处理输入 HEX 变化
   */
  const handleHexInputChange = useCallback((hexValue: string) => {
    setHexInputValue(hexValue)
  }, [])

  const handleHexInputBlur = (hexValue: string) => {
    const rgb = hexToRgb(hexValue)
    if (!rgb) return

    const { h, s, v } = rgbToHsv(rgb.r, rgb.g, rgb.b)

    const panelDom = hsvPanelRef.current
    if (!panelDom) return
    const { width, height } = panelDom.getBoundingClientRect()
    const newPos = svToPosition(width, height, s, v)

    setHue(h)
    setIndicatorPos(newPos)
  }


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
   * 当前颜色: HEX
   */
  const hexColor = useMemo(() => {
    return hsvToHex(hue, s, v)
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


  /**
   * 同步全局hue到Slider受控状态
   * 解决HEX输入后Slider位置更新的问题
   */
  useEffect(() => {
    setHueSliderValue(hue)
  }, [hue])


  /**
   * 同步计算态到输入态
   */
  useEffect(() => {
    if (currValueType === 'HEX') {
      setHexInputValue(hexColor)
    }
  }, [hexColor, currValueType])

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
          value={hueSliderValue}
        />
        <div className="u-color-picker-panel-color-preview"/>
      </UGrid.Row>
      {/* 格式与值 */}
      <UGrid.Row justify="space-between" align="center">
        <USelect
          style={{ width: '80px', height: '23px' }}
          size="small"
          value={currValueType}
          options={valueType}
          onChange={(newValue) => setCurrValueType(newValue as string)}
        />
        {
          currValueType === 'HEX' &&
          <HEXInput
            value={hexInputValue}
            onChange={handleHexInputChange}
            onBlur={handleHexInputBlur}
          /> 
        }
        {
          currValueType === 'RGB' &&
          <RGBInput value={rgbColor} />
        }
        {
          currValueType === 'CSS' &&
          <CSSInput value={rgbColor} />
        }
        
      </UGrid.Row>  
    </USpace>
  )
}


/**
 * 值修改: 16 进制格式
 */
const HEXInput = (
  props: {
    value:string,
    onChange: (value: string) => void
    onBlur: (value: string) => void
  }
) => {

  // 过滤逻辑 先replace再补#，避免覆盖
  const filterHexValue = (value: string) => {
    // 过滤非法字符
    let filtered = value.replace(/[^#0-9a-fA-F]/g, '').slice(0, 7)
    // 补#号（如果没有的话）
    if (filtered && !filtered.startsWith('#')) {
      filtered = `#${filtered}`
    }
    return filtered
  }

  const handleInput = (value: string) => {
    const filtered = filterHexValue(value)
    props.onChange(filtered)
  }

  const handleBlur = () => {
    const filtered = filterHexValue(props.value)
    props.onBlur(filtered)
  }

  return (
    <UInput
      size="small"
      align="center"
      value={props.value}
      style={{ width: '120px' }}
      onChange={handleInput}
      onBlur={handleBlur}
    />
  )
}


/**
 * 值修改: rgb 格式
 */
const RGBInput = (
  props: {
    value: string
  }
) => {
  // 从传进来的 rgb 中分解出三个色值
  const [r, g, b] = extractRgbValues(props.value)

  return (
    <UGrid.Row justify="flex-end">
      <UInput
        className="u-color-picker-panel-r-input"
        size="small"
        align="center"
        value={String(r)}
        style={{ width: '42px' }}
      />
      <UInput
        className="u-color-picker-panel-g-input"
        size="small"
        align="center"
        value={String(g)}
        style={{ width: '42px' }}
      />
      <UInput
        className="u-color-picker-panel-b-input"
        size="small"
        align="center"
        value={String(b)}
        style={{ width: '42px' }}
      />
    </UGrid.Row>
    
    
  )
}


/**
 * 值修改: rgb 格式
 */
const CSSInput = (
  props: {
    value: string
  }
) => {
  return (
    <UInput
      size="small"
      align="center"
      value={props.value}
      style={{ width: '120px' }}
    />
  )
}


UColorPicker.Panel = UColorPickerPanel

export default UColorPicker