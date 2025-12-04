import { Popup } from "./type"
import "./style.less"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"

const UrpPopup = (props: Popup) => {
  const [mouseEnter, setMouseEnter] = useState(false)
  const [clicked, setClicked] = useState(false)
  const timer: any = useRef(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const hasBindClickRef = useRef(false)

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
    if (props.trigger === 'hover') {
      clearTimeout(timer.current)
      timer.current = null
      setMouseEnter(true)
    }
  }, [props.trigger])

  const handleMouseLeave = useCallback(() => {
    if (props.trigger === 'hover') {
      clearTimeout(timer.current)
      setMouseEnter(false)
      timer.current = null
    }
  }, [props.trigger])

  const handleTriggerClick = useCallback(() => {
    setClicked(prev => !prev)
  }, [])

  const contentInnerClass = useMemo(() => {
    return genClassNameFromProps(
      {
        display: props.trigger === 'hover' ? 
          mouseEnter : 
          clicked,
        position: props.position,
      },
      'urp-popup-content',
      'urp-popup-content'
    )
  }, [mouseEnter, clicked, props.position, props.trigger])

  return(
    <div
      ref={popupRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="urp-popup">
      <div
        onMouseEnter={handleMouseEnter}
        className={contentInnerClass}
      >
        {props.arrow && <div className="urp-popup-arrow"/>}
        <div className="urp-popup-content-inner">
          {props.content}
        </div>
      </div>
      <div
        onClick={handleTriggerClick}
      >
        {props.children}
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