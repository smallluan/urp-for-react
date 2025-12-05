import { Popup } from "./type"
import "./style.less"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { defaultProps } from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"

const UrpPopup = (props: Popup) => {

  const mergedProps = { ...defaultProps, ...props }

  const [mouseEnter, setMouseEnter] = useState(false)
  const [clicked, setClicked] = useState(false)
  const timer: any = useRef(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const hasBindClickRef = useRef(false)

  useEffect(() => {
    if (mergedProps.trigger === 'click') {
      mergedProps.onChange?.(clicked)
    } else if (mergedProps.trigger === 'hover') {
      mergedProps.onChange?.(mouseEnter)
    }
  }, [mergedProps.trigger, mergedProps.onChange, mouseEnter, clicked])

  useEffect(() => {
    if (hasBindClickRef.current) return
    hasBindClickRef.current = true

    const handleWindowClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setClicked(false)
      }
    }

    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick)
      hasBindClickRef.current = false
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (mergedProps.trigger === 'hover') {
      clearTimeout(timer.current)
      timer.current = null
      setMouseEnter(true)
    }
  }, [mergedProps.trigger])

  const handleMouseLeave = useCallback(() => {
    if (mergedProps.trigger === 'hover') {
      clearTimeout(timer.current)
      setMouseEnter(false)
      timer.current = null
    }
  }, [mergedProps.trigger])

  const handleTriggerClick = useCallback(() => {
    setClicked(prev => !prev)
  }, [])

  const contentClass = useMemo(() => {
    return genClassNameFromProps(
      {
        display: mergedProps.trigger === 'hover' ? 
          mouseEnter : 
          clicked,
        position: mergedProps.position,
      },
      'urp-popup-content',
      'urp-popup-content'
    )
  }, [mouseEnter, clicked, mergedProps.position, mergedProps.trigger])

  return(
    <div
      ref={popupRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="urp-popup">
      <div
        onMouseEnter={handleMouseEnter}
        className={contentClass}
      >
        {mergedProps.arrow && <div className="urp-popup-arrow"/>}
        <div 
          style={{...mergedProps.style}}
          className={`urp-popup-content-inner ${mergedProps.className}`}
        >
          {mergedProps.content}
        </div>
      </div>
      <div
        onClick={handleTriggerClick}
      >
        {mergedProps.children}
      </div>
    </div>
  )
}

const Content = () => {
  return(
    <div>content</div>
  )
}

UrpPopup.Content = Content

export default UrpPopup