import { useEffect, useRef } from 'react'

// Hook 配置项
export type UseClickOutsideOptions = {
  /** 是否禁用监听（如弹窗关闭时不监听） */
  disabled?: boolean
  /** 忽略的元素 Ref 列表（点击这些元素不触发回调） */
  ignoreRefs?: React.RefObject<HTMLElement>[]
  /** 监听的事件类型（click/mousedown，默认click） */
  eventType?: 'click' | 'mousedown'
  /** 是否兼容移动端（监听touchstart，默认true） */
  enableTouch?: boolean
}

/**
 * 监听点击元素外部的自定义 Hook
 * @param targetRef 目标元素的 Ref（判断是否点击该元素以外）
 * @param callback 点击外部触发的回调
 * @param options 配置项
 */
const useClickOutside = (
  targetRef: React.RefObject<HTMLElement>,
  callback: (e: MouseEvent | TouchEvent) => void,
  options: UseClickOutsideOptions = {}
) => {
  const {
    disabled = false,
    ignoreRefs = [],
    eventType = 'click',
    enableTouch = true,
  } = options

  // 保存最新回调（避免依赖项变化导致重复监听）
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    // 禁用时不执行监听
    if (typeof disabled === 'boolean') {
      if (disabled) return
    }

    // 核心：判断点击的目标是否在“目标元素/忽略元素”外部
    const isClickOutside = (target: HTMLElement) => {
      // 目标元素不存在，直接返回 false
      if (!targetRef.current) return false
      // 点击目标元素内部 → 不触发
      if (targetRef.current.contains(target)) return false
      // 点击忽略元素内部 → 不触发
      if (ignoreRefs.some(ref => ref.current?.contains(target))) return false
      // 点击外部 → 触发
      return true
    }

    // 处理点击/触摸事件
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      // 兼容 TouchEvent：获取触摸的目标元素
      const target = (e as TouchEvent).touches?.[0]?.target || e.target
      if (!(target instanceof HTMLElement)) return

      if (isClickOutside(target)) {
        callbackRef.current(e) // 执行回调
      }
    }

    // 要监听的事件列表（兼容移动端）
    const events: string[] = [eventType]
    if (enableTouch) events.push('touchstart')

    // 绑定事件（被动监听优化滚动性能）
    events.forEach(type => {
      document.addEventListener(type, handleClickOutside, {
        passive: true,
        capture: false, // 冒泡阶段监听，避免影响其他事件
      })
    })

    // 组件卸载/依赖变化时解绑事件（避免内存泄漏）
    return () => {
      events.forEach(type => {
        document.removeEventListener(type, handleClickOutside)
      })
    }
  }, [disabled, ignoreRefs, eventType, enableTouch, targetRef])
}

export default useClickOutside
