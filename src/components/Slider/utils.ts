import { RefObject } from "react"

export const setButtonPosition = (
  e: MouseEvent | React.MouseEvent,
  trackRef: RefObject<HTMLElement | null>,
  max: number,
  min: number,
  step: number
): number => {
  const trackRect = trackRef.current?.getBoundingClientRect()
  if (!trackRect || min >= max) {
    return min
  }

  const mousePositionInPx = e.clientX - trackRect.left
  const positionRatio = Math.max(0, Math.min(1, mousePositionInPx / trackRect.width))

  const rawValue = min + positionRatio * (max - min)
  const steppedValue = Math.round((rawValue - min) / step) * step + min
  const finalValue = Math.min(Math.max(min, steppedValue), max)

  return finalValue
}


export const getButtonShouldMove = (
  e: MouseEvent | React.MouseEvent,
  trackRef: RefObject<HTMLElement | null>,
  startValue: number,
  endValue: number,
  min: number, 
  max: number
): 'end' | 'start' => {
  const trackRect = trackRef.current?.getBoundingClientRect()
  if (!trackRect || min >= max) {
    return 'end'
  }

  const mousePositionInPx = e.clientX - trackRect.left

  const startPositionInPx = ((startValue - min) / (max - min)) * trackRect.width
  const endPositionInPx = ((endValue - min) / (max - min)) * trackRect.width

  const distanceToStart = Math.abs(mousePositionInPx - startPositionInPx)
  const distanceToEnd = Math.abs(mousePositionInPx - endPositionInPx)

  if (distanceToEnd <= distanceToStart) {
    return 'end'
  } else if (distanceToStart < distanceToEnd) {
    return 'start'
  }

  return 'end'
}
