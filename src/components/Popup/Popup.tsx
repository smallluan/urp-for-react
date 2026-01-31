import { Popup } from "./type"
import "./style.less"
import { useEffect, useMemo, useRef, useState } from "react"
import { defaultProps } from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import UPopupContent from "./components/Content.tsx"
import useAnimatedVisibility from "../utils/hooks/useAnimatedVisibility.ts"
import useClickOutside from "../utils/hooks/useClickOutside.ts"
import PortalContainer from "../utils/tools/portal.tsx"
import { debounce } from "lodash"

const UPopup = (props: Popup) => {
  // 合并属性
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'content', 'visible', 'trigger', 'position', 'arrow', 'children',
      'className', 'style', 'onChange', 'contentClassName', 'contentStyle',
      'destoryOnClose'
    ]
  )

  const [mouseEnter, setMouseEnter] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [rightClicked, setRightClicked] = useState(false)
  const [contentPos, setContentPos] = useState({left: '', top: ''})

  const popupRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  // 显示是否受控
  const isVisibleControlled = _props.visible !== undefined
  // 是否显示 content 的内部状态
  const innerVisible = useMemo(() => {
    const { trigger } = _props
    if (trigger === 'hover') return mouseEnter
    if (trigger === 'click') return clicked
    if (trigger === 'rightClick') return rightClicked
    return false
  }, [_props.trigger, mouseEnter, clicked, rightClicked])
  // 是否显示 content 最终值
  const finalVisible = isVisibleControlled ? _props.visible : innerVisible

  // 支持 destoryOnClose
  const {
    display: popupDisplay,
    visible: popupVisible
  } = useAnimatedVisibility(finalVisible, 200)

  useEffect(() => {
    if (!finalVisible || !popupRef.current) return

    updatePos()
  }, [finalVisible])

  // 更新 content 位置
  const updatePos = debounce(() => {
    if (!popupRef.current) return
    const rect = popupRef.current.getBoundingClientRect()
    setContentPos({
      left: `${rect.left + window.scrollX}px`,
      top: `${rect.bottom + window.scrollY}px`,
    })
  }, 100)

  // 页面 scroll / resize 的时候需要重新计算 content 坐标
  useEffect(() => {
    window.addEventListener('scroll', updatePos, true)
    window.addEventListener('resize', updatePos)

    return () => {
      window.removeEventListener('scroll', updatePos, true)
      window.removeEventListener('resize', updatePos)
    }
  }, [])

  // 不同触发类型的 onChange （不考虑受控模式）
  useEffect(() => {
    const { trigger, onChange } = _props
    if (isVisibleControlled) return

    if (trigger === 'hover') {
      onChange?.(mouseEnter)
    } else if (trigger === 'click') {
      onChange?.(clicked)
    } else if (trigger === 'rightClick') {
      onChange?.(rightClicked)
    }
  }, [_props.trigger, props.onChange, mouseEnter, clicked, rightClicked])

  // 点击外部时，将内部 visible 设置为false
  useClickOutside(
    popupRef,
    () => {
      console.log(contentRef.current)
      setMouseEnter(false)
      setClicked(false)
      setRightClicked(false)
    },
    {
      ignoreRefs: [contentRef]  // 防止点击 content 时触发 clickoutside
    }
  ) 

  const popupClassName = useMemo(() => {
    return genClassNameFromProps(
      {},
      'u-popup',
      'u-popup',
      _props.className
    )
  }, [_props.className])

  return(
    <div
      ref={popupRef}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      onContextMenu={(e) => {
        e.preventDefault()
        setRightClicked(true)
      }}
      className={popupClassName}
      style={_props.style}
    >
      <PortalContainer ref={contentRef}>
        <UPopupContent
          className={_props.contentClassName}
          style={_props.contentStyle}
          display={popupDisplay}
          visible={popupVisible}
          destoryOnClose={_props.destoryOnClose}
          position={contentPos}
        >
          {_props.content}
        </UPopupContent>
      </PortalContainer>
      {
        <div onClick={() => setClicked(prev => !prev)}>
          {_props.children}
        </div>
      }
    </div>
  )
}

export default UPopup
