import { Collapse, Panel } from "./type"
import { UIcon } from "../Icon/index.ts"
import "./style.less"
import { useCallback, useEffect, useRef, useState } from "react"

const UCollapse = (props: Collapse) => {
  return (
    <div>UCollapse</div>
  )
}

const UPanel = (props: Panel) => {
  const [isExpand, setIsExpend] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [targetHeight, setTargetHeight] = useState('0')

  const contentRef  = useRef(null)

  const timerRef = useRef(null)

  const toogleExpand = useCallback(() => {
    setIsExpend(prev => {
      return !prev
    })
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (isExpand) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      setContentVisible(true)
      setTimeout(() => {
        setTargetHeight('auto')
      }, 200)
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      const el = contentRef?.current as HTMLElement | null
      setTargetHeight((el?.scrollHeight ?? 0) + 'px')
      setTimeout(() => {
        setTargetHeight('0px')
        // 给退出动画留时间 200 ms
        timerRef.current = setTimeout(() => {
          setContentVisible(false)
        }, 200)
      }, 100)
    }

  }, [isExpand])

  useEffect(() => {
    if (contentVisible) {
      requestAnimationFrame(() => {
        const el = contentRef?.current as HTMLElement | null
        setTargetHeight((el?.scrollHeight ?? 0) + 'px')
      })
    }
  }, [contentVisible])


  return (
    <div>
      {/* 面板头部 */}
      <div onClick={toogleExpand} >
        <UIcon type="CaretRightOutlined"/>
        {props.header}
      </div>

      {/* 被折叠部分 */}
      <div
        ref={contentRef}
        className="u-panel-content"
        style={{ height: targetHeight }}
      >
        {
          contentVisible &&
          props.children || props.content || null
        }
      </div>
    </div>
  )
}

UCollapse.Panel = UPanel

export default UCollapse
