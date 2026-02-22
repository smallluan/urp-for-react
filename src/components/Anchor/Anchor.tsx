import React, {
  cloneElement, createContext, isValidElement, useCallback,
  useContext, useEffect, useMemo, useRef, useState, ReactElement
} from "react"
import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"
import genClassNameFromProps from "../utils/tools/className.ts"

import { Anchor, AnchorItem, AnchorTarget, Context, AnchorItemClickEvent, TargetContainer } from "./type"

const AnchorContext = createContext<Context | undefined>(undefined)

const UAnchor = (props: Anchor) => {
  const [currAnchor, setCurrAnchor] = useState(0)
  const isScroll = useRef(false)
  const scrollOffset = props.scrollOffset || 0
  const targetContainerRef = useRef<TargetContainer>(window)

  // 实时获取目标容器
  const getTargetContainer = useCallback((): TargetContainer => {
    if (props.container) {
      const container = document.querySelector(props.container)
      if (container) {
        targetContainerRef.current = container
        return container
      }
    }
    targetContainerRef.current = window
    return window
  }, [props.container])

  const handleTargetScroll = useCallback(() => {
    const targetContainer = getTargetContainer()
    const anchorItems = React.Children.toArray(props.children).filter(child =>
      isValidElement(child) && child.type === Item
    ) as ReactElement<AnchorItem>[]

    if (anchorItems.length === 0) return

    let activeIndex = 0
    const totalLength = anchorItems.length
    const lastItem = anchorItems[totalLength - 1]
    const lastTargetId = lastItem.props.href?.replace(/^#/, '')

    if (!lastTargetId) {
      return
    }

    const checkInview = (container, anchor) => {
      if (container === window) {
        return anchor.top < window.innerHeight * 0.8 && anchor.bottom > 0
      } else {
        const containerRect = container.getBoundingClientRect()
        const anchorRelativeTop = anchor.top - containerRect.top
        const anchorRelativeBottom = anchor.bottom - containerRect.top
        const containerHeight = containerRect.height
        return anchorRelativeTop < containerHeight * 0.8 && anchorRelativeBottom > 0
      }
    }

    const lastTarget = document.getElementById(lastTargetId)
    
    if (lastTarget) {
      const lastRect = lastTarget.getBoundingClientRect()
      const isLastInView = checkInview(targetContainer, lastRect)
      if (isLastInView) {
        activeIndex = totalLength - 1
        if (activeIndex !== currAnchor && !isScroll.current) {
          setCurrAnchor(activeIndex)
        }
        return
      }
    }

    for (let i = 0; i < totalLength; i++) {
      const targetId = anchorItems[i].props.href?.replace(/^#/, '')
      if (!targetId) continue
      const target = document.getElementById(targetId)
      if (!target) continue

      const rect = target.getBoundingClientRect()
      const isInView = checkInview(targetContainer, rect)
      if (isInView) {
        activeIndex = i
        break
      }
    }

    if (activeIndex !== currAnchor && !isScroll.current) {
      setCurrAnchor(activeIndex)
    }
  }, [currAnchor, props.children, getTargetContainer])

  const bindScrollEvent = useCallback(() => {
    const targetContainer = getTargetContainer()
    targetContainer.removeEventListener('scroll', handleTargetScroll)
    targetContainer.addEventListener('scroll', handleTargetScroll, { passive: true })

    return () => {
      targetContainer.removeEventListener('scroll', handleTargetScroll)
    }
  }, [handleTargetScroll, getTargetContainer])

  useEffect(() => {
    const cleanup = bindScrollEvent()
    handleTargetScroll() // 挂载后主动触发一次判定
    return cleanup
  }, [bindScrollEvent, handleTargetScroll])

  const renderValidChildren = () => {
    const childrenArray = React.Children.toArray(props.children)
    const anchorItems = childrenArray.filter(child => (
      isValidElement(child) && child.type === Item
    )) as ReactElement<AnchorItem>[]
    return anchorItems.map((child, index) => (
      cloneElement(child, {
        key: child.key || `item-${index}`,
        anchorIndex: index,
        scrollOffset,
        ...child.props
      })
    ))
  }

  const handleClick = useCallback((newAnchor: number) => {
    const targetContainer = getTargetContainer()
    targetContainer.removeEventListener('scroll', handleTargetScroll)
    isScroll.current = true
    setCurrAnchor(newAnchor) 

    const resetScrollListener = () => {
      bindScrollEvent()
      isScroll.current = false
    }

    if (targetContainer === window) {
      if ('onscrollend' in window) {
        const onScrollEnd = () => {
          window.removeEventListener('scrollend', onScrollEnd)
          resetScrollListener()
        }
        window.addEventListener('scrollend', onScrollEnd, { once: true })
      } else {
        setTimeout(resetScrollListener, 800)
      }
    } else {
      let scrollTimer = null
      const onScroll = () => {
        clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => {
          targetContainer.removeEventListener('scroll', onScroll)
          resetScrollListener()
        }, 100)
      }
      targetContainer.addEventListener('scroll', onScroll, { passive: true })
      setTimeout(() => {
        clearTimeout(scrollTimer)
        targetContainer.removeEventListener('scroll', onScroll)
        resetScrollListener()
      }, 800)
    }
  }, [bindScrollEvent, handleTargetScroll, getTargetContainer])

  const contextValue = useMemo(() => ({
    handleClick,
    currAnchor,
    scrollOffset,
    targetContainer: getTargetContainer()
  }), [handleClick, currAnchor, scrollOffset, getTargetContainer])

  const anchorStyle = useMemo(() => {
    const childrenLength = renderValidChildren().length
    return genStyleFromProps({
      cursorHeight: (100 * 0.6 / childrenLength).toFixed(2) + '%',
      cursorOffset: '30%',
      marginTop: (100 * currAnchor / childrenLength).toFixed(2) + '%'
    })
  }, [currAnchor, renderValidChildren])

  const anchorClassName = useMemo(() => (
    genClassNameFromProps(
      {
        size: props.size
      },
      "u-anchor",
      "u-anchor",
      props.className
    )
  ), [props.size, props.className])

  return (
    <AnchorContext.Provider value={contextValue}>
      <div style={anchorStyle} className={anchorClassName}>
        <div className="u-anchor-line">
          {
            props.cursor ? 
            <div className="u-anchor-line-cursor-with-child">
              {props.cursor}
            </div> :
            <div className="u-anchor-line-cursor"/>
          }
        </div>
        <div>
          {renderValidChildren()}
        </div>
      </div>
    </AnchorContext.Provider>
  )
}

const Item = (props: AnchorItem) => {
  const context = useContext(AnchorContext)
  if (!context) {
    throw new Error('UAnchor.Item 组件仅能在 UAnchor 组件中使用!')
  }

  const ctx = context as Context

  const handleClick = useCallback((e: AnchorItemClickEvent) => {
    e?.preventDefault()

    const targetId = props.href?.replace(/^#/, '')
    if (!targetId) return

    const target = document.getElementById(targetId)
    if (!target) {
      console.warn(`锚点元素 ${targetId} 不存在`)
      return
    }

    const container = context.targetContainer
    const isWindow = container === window
    let scrollTop = 0

    if (isWindow) {
      // window场景：基于文档的偏移
      scrollTop = target.offsetTop - ctx.scrollOffset
    } else {
      // 自定义容器：基于容器的偏移
      const containerRect = (container as Element).getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      scrollTop = (container as Element).scrollTop + (targetRect.top - containerRect.top - ctx.scrollOffset)
    }

    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    })

    ctx.handleClick(props.anchorIndex!)
  }, [props.href, props.anchorIndex, context])

  const itemClass = useMemo(() => {
    return genClassNameFromProps(
      { active: context.currAnchor === props.anchorIndex },
      "u-anchor-item",
      "u-anchor-item"
    )
  }, [context.currAnchor, props.anchorIndex])

  return (
    <a
      href={props.href}
      onClick={handleClick}
      className={itemClass}
    >
      {props.children}
    </a>
  )
}
const Target = (props: AnchorTarget) => {
  return (
    <div id={props.id} className={props.className}>
      {props.children}
    </div>
  )
}

UAnchor.Item = Item
UAnchor.Target = Target

export default UAnchor