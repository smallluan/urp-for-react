import React, {
  cloneElement, createContext, isValidElement, useCallback,
  useContext, useEffect, useMemo, useRef, useState, ReactElement
} from "react"
import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"
import genClassNameFromProps from "../utils/tools/className.ts"

import { Anchor, AnchorItem, AnchorTarget, Context, AnchorItemClickEvent } from "./type"

const AnchorContext = createContext<Context | undefined>(undefined)

const UAnchor = (props: Anchor) => {
  const [currAnchor, setCurrAnchor] = useState(0)
  const isScroll = useRef(false)
  // 滚动偏移量
  const scrollOffset = props.scrollOffset || 0

 const handleTargetScroll = useCallback(() => {
  const anchorItems = React.Children.toArray(props.children).filter(child =>
    isValidElement(child) && child.type === Item
  ) as ReactElement<AnchorItem>[]

  if (anchorItems.length === 0) return

  let activeIndex = 0
  const totalLength = anchorItems.length
  // 提前获取最后一个锚点元素
  const lastItem = anchorItems[totalLength - 1]
  const lastTargetId = lastItem.props.href?.replace(/^#/, '')

  if (!lastTargetId) {
    return
  }

  const lastTarget = document.getElementById(lastTargetId)
  
  // 优先判断最后一个元素是否满足可见条件，满足则直接设为激活项
  if (lastTarget) {
    const lastRect = lastTarget.getBoundingClientRect()
    const isLastInView = lastRect.top < window.innerHeight * 0.8 && lastRect.bottom > 0
    if (isLastInView) {
      activeIndex = totalLength - 1
      // 直接跳过后续循环，更新锚点状态
      if (activeIndex !== currAnchor && !isScroll.current) {
        setCurrAnchor(activeIndex)
      }
      return
    }
  }

  // 最后一个元素未满足条件时，执行原有的正序遍历逻辑
  for (let i = 0; i < totalLength; i++) {
    const targetId = anchorItems[i].props.href?.replace(/^#/, '')
    if (!targetId) continue
    const target = document.getElementById(targetId)
    if (!target) continue

    const rect = target.getBoundingClientRect()
    // 判定条件（对第一个元素友好：只要顶部进入视口就选中）
    const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
    if (isInView) {
      activeIndex = i
      break
    }
  }

  // 仅锚点变化时更新（非点击滚动状态下）
  if (activeIndex !== currAnchor && !isScroll.current) {
    setCurrAnchor(activeIndex)
  }
}, [currAnchor, props.children])

  // 绑定/解绑滚动事件（确保每次绑定前先移除，避免重复监听）
  const bindScrollEvent = useCallback(() => {
    window.removeEventListener('scroll', handleTargetScroll)
    window.addEventListener('scroll', handleTargetScroll, { passive: true })
  }, [handleTargetScroll])

  useEffect(() => {
    bindScrollEvent()
    // 卸载时清理事件
    return () => {
      window.removeEventListener('scroll', handleTargetScroll)
    }
  }, [bindScrollEvent])

  // 渲染有效子元素（锚点项）
  const renderValidChildren = () => {
    const childrenArray = React.Children.toArray(props.children)
    const anchorItems = childrenArray.filter(child => (
      isValidElement(child) && child.type === Item
    )) as ReactElement<AnchorItem>[]
    return anchorItems.map((child, index) => (
      cloneElement(child, {
        key: child.key || `item-${index}`,
        anchorIndex: index,
        scrollOffset, // 传递偏移量给Item组件
        ...child.props
      })
    ))
  }

  // 手动点击锚点时更新状态：先取消监听，滚动完成后重新监听
  const handleClick = useCallback((newAnchor: number) => {
    // 1. 立即移除滚动监听，避免滚动过程中更新currAnchor
    window.removeEventListener('scroll', handleTargetScroll)
    isScroll.current = true
    setCurrAnchor(newAnchor)

    // 2. 滚动完成后重新绑定监听（优先用原生scrollend，兼容用setTimeout）
    const resetScrollListener = () => {
      bindScrollEvent() // 重新绑定监听
      isScroll.current = false
    }

    // 现代浏览器支持scrollend事件
    if ('onscrollend' in window) {
      const onScrollEnd = () => {
        window.removeEventListener('scrollend', onScrollEnd)
        resetScrollListener()
      }
      window.addEventListener('scrollend', onScrollEnd, { once: true })
    } else {
      // 兼容不支持scrollend的浏览器（平滑滚动通常300-600ms，设800ms兜底）
      setTimeout(resetScrollListener, 800)
    }
  }, [bindScrollEvent, handleTargetScroll])

  const contextValue = useMemo(() => ({
    handleClick,
    currAnchor,
    scrollOffset
  }), [handleClick, currAnchor, scrollOffset])

  // 锚点样式计算
  const anchorStyle = useMemo(() => {
    const childrenLength = renderValidChildren().length
    return genStyleFromProps({
      cursorHeight: (100 * 0.6 / childrenLength).toFixed(2) + '%',
      cursorOffset: '30%',
      marginTop: (100 * currAnchor / childrenLength).toFixed(2) + '%'
    })
  }, [currAnchor, renderValidChildren])

  return (
    <AnchorContext.Provider value={contextValue}>
      <div style={anchorStyle} className={"u-anchor " + (props.className || "")}>
        <div className="u-anchor-line">
          <div className="u-anchor-line-cursor"></div>
        </div>
        <div>
          {renderValidChildren()}
        </div>
      </div>
    </AnchorContext.Provider>
  )
}

// 锚点项组件
const Item = (props: AnchorItem) => {
  const context = useContext(AnchorContext)
  if (!context) {
    throw new Error('UAnchor.Item 组件仅能在 UAnchor 组件中使用!')
  }

  const ctx = context as Context

  const handleClick = useCallback((e: AnchorItemClickEvent) => {
    e?.preventDefault() // 阻止a标签默认跳转

    const targetId: string | undefined = props.href?.replace(/^#/, '')
    if (!targetId) return

    const target: HTMLElement | null = document.getElementById(targetId)
    if (!target) {
      console.warn(`锚点元素 ${targetId} 不存在`)
      return
    }

    // 使用原生scrollTo API实现平滑滚动
    window.scrollTo({
      top: target.offsetTop - ctx.scrollOffset, // 应用偏移量
      behavior: 'smooth' // 原生平滑滚动
    })

    // 手动更新锚点激活状态（触发UAnchor的handleClick，取消滚动监听）
    ctx.handleClick(props.anchorIndex!)
  }, [props.href, props.anchorIndex, context])

  // 计算锚点项类名（激活态）
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

// 锚点目标组件
const Target = (props: AnchorTarget) => {
  return (
    <div id={props.id} className={props.className}>
      {props.children}
    </div>
  )
}

// 挂载子组件
UAnchor.Item = Item
UAnchor.Target = Target

export default UAnchor