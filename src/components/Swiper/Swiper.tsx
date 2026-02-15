import { SwiperProps, SwiperItemProps } from "./type"
import { swiperDefaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import React, { useMemo, useState, useRef, useCallback, useEffect } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"
import "./style.less"
import USpace from "../Space/Space.tsx"
import classNames  from 'classnames'

const USwiper = (props: SwiperProps) => {
  const { merged: _props } = useMergedProps(
    swiperDefaultProps,
    props,
    [
      'className',
      'style',
      'autoplay',
      'current',
      'defaultCurrent',
      'direction',
      'duration',
      'interval',
      'loop',
      'stopOnHover',
      'children',
      'onChange'
    ]
  )

  const swiperContainerRef = useRef<HTMLDivElement>(null)
  const swiperTrackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null)
  const isHover = useRef(false)
  const latestCurrentRef = useRef<number>(0)

  const isControlled = _props.current !== undefined
  // 受控模式下强制禁用autoplay
  const effectiveAutoplay = _props.autoplay && !isControlled
  
  const [innerCurrent, setInnerCurrent] = useState(_props.defaultCurrent || 0)
  const finalCurrent = useMemo(() => (
    isControlled ? _props.current : innerCurrent
  ), [isControlled, _props.current, innerCurrent])

  useEffect(() => {
    latestCurrentRef.current = finalCurrent
  }, [finalCurrent])

  const validItem = useMemo(() => {
    itemRefs.current = []
    return React.Children.map(_props.children, (item, index) => {
      if (React.isValidElement(item) && item.type === USwiperItem) {
        return React.cloneElement(item, {
          ref: (el: HTMLDivElement | null) => {
            itemRefs.current[index] = el
          },
          ...item.props
        })
      }
      return null
    }).filter(Boolean)
  }, [_props.children])

  const getNextIndex = useCallback(() => {
    const current = latestCurrentRef.current
    const itemCount = validItem.length
    if (itemCount <= 1) return current
    const next = current + 1
    return _props.loop ? (next % itemCount) : Math.min(next, itemCount - 1)
  }, [_props.loop, validItem.length])

  const triggerOnChange = useCallback((newIndex: number) => {
    if (typeof _props.onChange === 'function') {
      _props.onChange(newIndex)
    }
  }, [_props.onChange])

  const scrollToCurrent = useCallback((targetCurrent: number, isAutoPlay = false) => {
    if (!swiperContainerRef.current || !swiperTrackRef.current || itemRefs.current.length === 0) return
    
    const validCurrent = Math.max(0, Math.min(targetCurrent, itemRefs.current.length - 1))
    const container = swiperContainerRef.current
    const track = swiperTrackRef.current

    const isVertical = _props.direction === 'vertical'
    const singleSize = isVertical 
      ? (itemRefs.current[0]?.clientHeight || 200) 
      : container.clientWidth

    const offset = -validCurrent * singleSize

    track.style.transition = `transform ${_props.duration || 300}ms ease`
    track.style.transform = isVertical 
      ? `translateY(${offset}px)` 
      : `translateX(${offset}px)`

    if (!isControlled && validCurrent !== latestCurrentRef.current) {
      setInnerCurrent(validCurrent)
    }
    if (validCurrent !== latestCurrentRef.current || isAutoPlay) {
      triggerOnChange(validCurrent)
    }
    latestCurrentRef.current = validCurrent
  }, [_props.duration, _props.direction, isControlled, triggerOnChange])

  const startAutoplay = useCallback(() => {
    if (!effectiveAutoplay || isHover.current || validItem.length <= 1) return
    
    if (autoplayTimer.current) clearTimeout(autoplayTimer.current)
    
    autoplayTimer.current = setTimeout(() => {
      const nextIndex = getNextIndex()
      scrollToCurrent(nextIndex, true)
      startAutoplay()
    }, _props.interval || 3000)
  }, [effectiveAutoplay, _props.interval, getNextIndex, scrollToCurrent, validItem.length])

  const pauseAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearTimeout(autoplayTimer.current)
      autoplayTimer.current = null
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (_props.stopOnHover) {
      isHover.current = true
      pauseAutoplay()
    }
  }, [_props.stopOnHover, pauseAutoplay])

  const handleMouseLeave = useCallback(() => {
    if (_props.stopOnHover) {
      isHover.current = false
      startAutoplay()
    }
  }, [_props.stopOnHover, startAutoplay])

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCurrent(finalCurrent)
    }, 0)
    return () => clearTimeout(timer)
  }, [finalCurrent, scrollToCurrent])

  useEffect(() => {
    if (effectiveAutoplay) {
      pauseAutoplay()
      startAutoplay()
    } else {
      pauseAutoplay()
    }
    return () => {
      pauseAutoplay()
      isHover.current = false
    }
  }, [effectiveAutoplay, _props.interval, _props.loop, startAutoplay, pauseAutoplay])

  const swiperClassName = useMemo(() => (
    genClassNameFromProps(
      {},
      'u-swiper',
      'u-swiper',
      _props.className
    )
  ), [_props.className])

  return (
    <div className={swiperClassName} style={_props.style}>
      <div
        ref={swiperContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: '100%',
          height: _props.direction === 'vertical' ? (itemRefs.current[0]?.clientHeight || 200) : '100%',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div
          ref={swiperTrackRef}
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: _props.direction === 'vertical' ? 'column' : 'row',
            height: _props.direction === 'vertical' ? 'auto' : '100%',
            width: _props.direction === 'vertical' ? '100%' : 'auto'
          }}
        >
          {validItem}
        </div>
      </div>
      <USwiperIndecator count={validItem.length} current={finalCurrent}/>
    </div>
  )
}

const USwiperItem = React.forwardRef<HTMLDivElement, SwiperItemProps>((props, ref) => {
  const itemClassName = useMemo(() => (
    genClassNameFromProps(
      {},
      'u-swiper-item',
      'u-swiper-item',
      props.className
    )
  ), [props.className])
  
  return (
    <div
      ref={ref}
      className={itemClassName}
      style={{
        ...props.style,
        flex: '0 0 100%',
        boxSizing: 'border-box',
        width: '100%',
        height: 'auto'
      }}
    >
      {props.children}
    </div>
  )
})
const USwiperIndecator = (props: {
  count: number,
  current: number
}) => {
  return (
    <USpace className="u-swiper-indecator">
      {
        Array.from({ length: props.count }).map((_, index) => (
          <div
            key={index}
            className={classNames(
              "u-swiper-indecator-item",
              { "u-swiper-indecator-item-active": index === props.current }
            )}
          />
        ))
      }
    </USpace>
  )
}

USwiperItem.displayName = 'USwiperItem'

USwiper.Item = USwiperItem

export default USwiper
