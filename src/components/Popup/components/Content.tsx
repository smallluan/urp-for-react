import genClassNameFromProps from "../../utils/tools/className.ts"
import useAnimatedVisibility from "../../utils/hooks/useAnimatedVisibility.ts"
import { useState, useMemo, useEffect } from "react"
import { usePopper } from 'react-popper'
import PortalContainer from "../../utils/tools/portal.tsx"

// 完善类型定义，替换any类型
interface UPopupContentProps {
  popupRef: React.RefObject<HTMLElement>
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  popperVisible: boolean
  destoryOnClose: boolean
  placement: Options['placement'] // 使用react-popper的内置类型
}

const UPopupContent = (
  props: UPopupContentProps
) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const {
    display: contentDisplay,
    visible: contentVisible
  } = useAnimatedVisibility(props.popperVisible, 200)

  // 内容容器类名
  const contentClassName = useMemo(() => {
    return genClassNameFromProps(
      {
        hide: !props.destoryOnClose && !contentDisplay
      },
      'u-popup-content',
      'u-popup-content',
      props.className
    )
  }, [props.className, props.destoryOnClose, contentDisplay])

  // 优化popper配置，解决位置计算问题
  const {
    styles,
    attributes,
    update, // 获取update方法手动触发位置更新
    instance // popper实例
  } = usePopper(
    props.popupRef.current, 
    popperElement, 
    {
      placement: props.placement || 'bottom',
      modifiers: [
        {
          name: 'preventOverflow',
          options: { 
            padding: 8,
            // 限制溢出检测的边界，避免计算错误
            rootBoundary: 'viewport' 
          }
        },
        {
          name: 'flip',
          options: {
            padding: 8,
            // 切换方向时立即更新，不等待
            behavior: 'flip'
          }
        },
        // 禁用默认的偏移，避免叠加偏移导致位置错误
        {
          name: 'offset',
          options: {
            offset: [0, 8] // 自定义偏移，按需调整
          }
        }
      ],
      // 隐藏时也计算位置，避免显示时重新计算导致偏移
      strategy: 'absolute',
      updateWhenHidden: true,
      // 启用自动监听事件，滚动/调整尺寸时自动更新位置
      eventListeners: {
        scroll: true,
        resize: true,
        scrollStrategy: 'observe'
      }
    }
  )

  // 监听popperVisible变化，手动触发位置更新
  useEffect(() => {
    if (props.popperVisible && popperElement && props.popupRef.current) {
      // 延迟一小段时间，确保DOM布局完成
      const timer = setTimeout(() => {
        update?.() // 手动更新popper位置
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [props.popperVisible, popperElement, props.popupRef, update])

  // 监听元素尺寸变化，自动更新位置（解决滚动矫正问题）
  useEffect(() => {
    const popperInstance = instance
    if (!popperInstance) return

    // 监听popper元素的尺寸变化
    const observer = new ResizeObserver(() => {
      if (props.popperVisible) {
        update?.()
      }
    })

    if (popperElement) {
      observer.observe(popperElement)
    }

    return () => {
      observer.disconnect()
    }
  }, [instance, popperElement, props.popperVisible, update])

  const showContent = useMemo(() => (
    (props.destoryOnClose && contentDisplay) || !props.destoryOnClose
  ), [props.destoryOnClose, contentDisplay])

  return (
    <>
      {
        showContent &&
        <PortalContainer>
          <div
            ref={(el) => setPopperElement(el)}
            className={contentClassName}
            style={{
              ...styles.popper,
              ...props.style,
              transition: 'opacity 0.2s ease',
              pointerEvents: contentVisible ? 'auto' : 'none',
              opacity: contentVisible ? 1 : 0
            }}
            {...attributes.popper}
          >
            {props.children}
          </div>
        </PortalContainer>
      }
    </>
  )
}

export default UPopupContent