import { Popup } from "./type"
import "./style.less"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { defaultProps } from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import React from "react"
import useMergedProps from "../utils/hooks/useMergedProps.ts"

const UPopup = (props: Popup) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'content', 'visible', 'trigger', 'position', 'arrow', 
      'className', 'style', 'onChange'
    ]
  )

  const [mouseEnter, setMouseEnter] = useState(false)
  const [clicked, setClicked] = useState(false)
  const popupRef = useRef(null)
  const hasBindClickRef = useRef(false)

  const contentChildren = React.Children.toArray(props.children).find(item => item.type === UPopup.Content)

  useEffect(() => {
    if (_props.trigger === 'click') {
      _props.onChange?.(clicked)
    } else if (_props.trigger === 'hover') {
      _props.onChange?.(mouseEnter)
    }
  }, [_props.trigger, _props.onChange, mouseEnter, clicked])

  useEffect(() => {
    if (hasBindClickRef.current) return
    hasBindClickRef.current = true

    const handleWindowClick = (e) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(e.target)
      ) {
        setClicked(false)
        props?.onClickOut?.()
      }
    }

    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick)
      hasBindClickRef.current = false
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (_props.trigger === 'hover') {
      setMouseEnter(true)
    }
  }, [_props.trigger])

  const handleMouseLeave = useCallback(() => {
    if (_props.trigger === 'hover') {
      setMouseEnter(false)
    }
  }, [_props.trigger])

  const handleTriggerClick = useCallback(() => {
    setClicked(prev => !prev)
  }, [])

  return(
    <div
      ref={popupRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`u-popup ${_props.className}`}
    >
      {
        contentChildren ?
        contentChildren:
        _props.content ?
        <Content
          style={{..._props.style}}
          className={`u-popup-content-inner`}
          visible={_props.visible}
          position={_props.position}
          mouseEnter={mouseEnter}
          clicked={clicked}
          trigger={_props.trigger}
          arrow={_props.arrow}
          handleMouseEnter={handleMouseEnter}
        >
          {_props.content}
        </Content> :
        <div></div>
      }
      {
        React.Children.map(props.children, (child) => {
          // 过滤掉 Content 类型的子元素
          if (child.type === Content) return null

          // 非元素节点（如文本节点）直接返回，避免克隆报错
          if (!React.isValidElement(child)) {
            return child
          }

          // 克隆子元素，合并 onClick 事件（保留原有事件 + 新增 handleTriggerClick）
          return React.cloneElement(child, {
            onClick: (e) => {
              // 优先执行子元素自身的 onClick（如果有）
              if (child.props?.onClick) {
                child.props.onClick(e)
              }
              // 执行原外层 div 的点击逻辑
              handleTriggerClick(e)
            },
          })
        })
      }
    </div>
  )
}

const Content = (props) => {
  const showPopup = useMemo(() => {
    if (props.visible !== undefined) return props.visible
    if (props.trigger === 'hover') return props.mouseEnter
    if (props.trigger === 'click') return props.clicked
    return false
  }, [props.visible, props.trigger, props.mouseEnter, props.clicked])

  const contentClass = useMemo(() => {
    return genClassNameFromProps(
      {
        display: showPopup,
        position: props.position,
      },
      'u-popup-content',
      'u-popup-content'
    )
  }, [showPopup, props.position])

  return (
    <div
      onMouseEnter={props.handleMouseEnter}
      className={contentClass}
    >
      {props.arrow && <div className="u-popup-arrow" />}
      <div
        style={{ ...props.style }}
        onMouseEnter={props.onMouseEnter}
        className={`u-popup-content-inner ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  )
}

UPopup.Content = Content

export default UPopup