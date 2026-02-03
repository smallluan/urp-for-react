import { PopupProps } from "./type"
import "./style.less"
import { useMemo, useRef, useState } from "react"
import { defaultProps } from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import UPopupContent from "./components/Content.tsx"
import useClickOutside from "../utils/hooks/useClickOutside.ts"
import useTriggerOnChange from "./hooks/useTriggerOnChange.ts"


const UPopup = (props: PopupProps) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'content',
      'visible',
      'trigger',
      'position',
      'arrow',
      'children',
      'className',
      'style',
      'onChange',
      'contentClassName',
      'contentStyle',
      'destoryOnClose'
    ]
  )

  const [mouseEnter, setMouseEnter] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [rightClicked, setRightClicked] = useState(false)

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

  useTriggerOnChange(
    _props.trigger, _props.onChange, mouseEnter,
    clicked, rightClicked, isVisibleControlled
  )

  // 点击外部时，将内部 visible 设置为false
  useClickOutside(
    popupRef,
    () => {
      setMouseEnter(false)
      setClicked(false)
      setRightClicked(false)
    },
    {ignoreRefs: [contentRef]}
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
      <UPopupContent
        popupRef={popupRef}
        className={_props.contentClassName}
        style={_props.contentStyle}
        popperVisible={finalVisible}
        destoryOnClose={_props.destoryOnClose}
        placement={_props.position}
      >
        {_props.content}
      </UPopupContent>
      <div onClick={() => setClicked(prev => !prev)}>
        {_props.children}
      </div>
    </div>
  )
}

export default UPopup
