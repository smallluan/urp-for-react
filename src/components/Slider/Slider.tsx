import { UTooltip } from "../Tooltip/index.ts"
import { Slider } from "./type"
import "./style.less"
import { useCallback, useEffect, useRef, useState } from "react"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { defaultProps } from "./properties.ts"
import { setButtonPosition, getButtonShouldMove } from "./utils.ts"

const USlider = (props: Slider) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'layout', 'max',
      'min', 'value', 'defaultValue', 'tooltipProps',
      'step', 'range'
    ]
  )

  const [isDragging, setIsDragging] = useState(false)
  const [endValue, setEndValue] = useState(_props.max)
  const [startValue, setStartValue] = useState(_props.min)
  const buttonShouldMove = useRef('end')
  const sliderRef = useRef<HTMLElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    if (_props.range) {
      buttonShouldMove.current = getButtonShouldMove(e, sliderRef, startValue, endValue, _props.min, _props.max)
    } else {
      buttonShouldMove.current = 'end'
    }
    if (buttonShouldMove.current === 'start') {
      const newValue = setButtonPosition(e, sliderRef, _props.max, _props.min, _props.step)
      if (newValue > endValue) {
        setEndValue(newValue)
      }
      setStartValue(newValue)
    } else {
      const newValue = setButtonPosition(e, sliderRef, _props.max, _props.min, _props.step)
      if (newValue < startValue) {
        setStartValue(newValue)
      }
      setEndValue(newValue)
    }
  }, [_props.max, _props.min, _props.step, endValue, startValue])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      if (buttonShouldMove.current === 'start') {
        const newValue = setButtonPosition(e, sliderRef, _props.max, _props.min, _props.step)
        if (newValue > endValue) {
          setEndValue(newValue)
        }
        setStartValue(newValue)
      } else {
        const newValue = setButtonPosition(e, sliderRef, _props.max, _props.min, _props.step)
        if (newValue < startValue) {
          setStartValue(newValue)
        }
        setEndValue(newValue)
      }
    }
  }, [_props.max, _props.min, _props.step, endValue, startValue, isDragging])


  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div 
      ref={sliderRef}
      className="u-slider"
      onMouseDown={handleMouseDown}
    >
      <div
        className="u-slider-track"
        style={{
          width: `${(endValue - startValue) * 100 / (_props.max - _props.min)}%`, 
          marginLeft: `${(startValue - _props.min) * 100 / (_props.max - _props.min)}%`
        }}
      />
      <USliderButton isDragging={isDragging} value={endValue} min={_props.min} max={_props.max} />
      {
        _props.range &&
        <USliderButton isDragging={isDragging} value={startValue} min={_props.min} max={_props.max} />
      }
    </div>
  )
}

const USliderButton = (props) => {
  const [isHoverButton, setIsHoverButton] = useState(false)
  return (
    <UTooltip 
      content={String(props.value)} 
      theme="default" 
      position="top"
      arrow
      popupProps={{
        visible: props.isDragging || isHoverButton,
        className: 'u-slider-button-tooltip',
        style: {left: `${(props.value - props.min) * 100 / (props.max - props.min)}%`},
      }}
    >
      <div
        className="u-slider-button"
        onMouseEnter={() => setIsHoverButton(true)}
        onMouseLeave={() => setIsHoverButton(false)}
      />
    </UTooltip>
  )
}

export default USlider
