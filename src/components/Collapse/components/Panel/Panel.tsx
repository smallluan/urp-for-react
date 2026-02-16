import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import genClassNameFromProps from "../../../utils/tools/className.ts"
import { Panel } from "./type"
import { UIcon } from "../../../Icon/index.ts"
import useMergedProps from "../../../utils/hooks/useMergedProps.ts"
import defaultProps from "./properties.ts"
import useAnimatedVisibility from "../../../utils/hooks/useAnimatedVisibility.ts"
import "./style.less"
import { USpace } from "../../../Space/index.ts"

const UPanel = (props: Panel) => {
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'children', 'content',
      'header', 'icon', 'destroyOnCollapse', 'expandOnRowClick',
      'disabled', 'borderless', 'value', 'iconPlacement',
      'expand', 'defaultExpand', 'onChange'
    ]
  )

  const isControlled = _props.expand !== undefined
  const [innerExpand, setInnerExpand] = useState(() => _props.defaultExpand ?? false)
  const isExpand = isControlled ? _props.expand : innerExpand

  const { display, visible } = useAnimatedVisibility(isExpand, 200)

  const [targetHeight, setTargetHeight] = useState('0px')
  const contentRef = useRef<HTMLElement>(null)
  const isInitRef = useRef(true)

  const toogleExpand = useCallback((source: 'icon' | 'row') => {
    if (_props.disabled || (!_props.expandOnRowClick && source === 'row')) return
    if (!isControlled) {
      setInnerExpand(prev => !prev)
    }
  }, [_props.disabled, _props.expandOnRowClick, isControlled])

  useEffect(() => {
    if (!isInitRef.current) {
      _props.onChange?.(_props.value, isExpand)
    }
  }, [isExpand, _props.onChange, _props.value])

  useEffect(() => {
    isInitRef.current = false
    return () => {
      isInitRef.current = true
    }
  }, [])

  useEffect(() => {
    const contentEl = contentRef.current
    if (!contentEl) return

    if (display && visible) {
      requestAnimationFrame(() => {
        const scrollHeight = contentEl.scrollHeight
        setTargetHeight(`${scrollHeight}px`)
        setTimeout(() => setTargetHeight('auto'), 200)
      })
    }

    if (!visible) {
      requestAnimationFrame(() => {
        const scrollHeight = contentEl.scrollHeight
        setTargetHeight(`${scrollHeight}px`)
        requestAnimationFrame(() => {
          setTargetHeight('0px')
        })
      })
    }
  }, [display, visible])

  const panelClass = useMemo(() => {
    return genClassNameFromProps(
      { 
        disabled: _props.disabled,
        borderless: _props.borderless
      },
      "u-panel",
      "u-panel",
      _props.className
    )
  }, [_props.disabled, _props.borderless, _props.className])

  const headerClass = useMemo(() => {
    return genClassNameFromProps(
      { expand: isExpand },
      "u-panel-header",
      "u-panel-header"
    )
  }, [isExpand])

  const iconClass = useMemo(() => {
    return genClassNameFromProps(
      { expand: isExpand },
      "u-panel-icon",
      "u-panel-icon"
    )
  }, [isExpand])

  return (
    <div 
      className={panelClass}
      style={_props.style}
    >
      {/* 面板头部 */}
      <div className={headerClass} onClick={() => toogleExpand('row')} >
        <USpace
          style={{
            flexDirection: _props.iconPlacement === 'right' ? 
            'row-reverse' : 
            'row'
          }}
        >
          <UIcon
            onClick={(e) => {
              e.stopPropagation()
              toogleExpand('icon')
            }}
            size={10}
            className={iconClass}
            type={_props.icon || "RightOutlined"}
          />
          <div style={{flex: '1'}}>
            {_props.header}
          </div>
        </USpace>
      </div>

      <div
        ref={contentRef}
        className="u-panel-content"
        style={{height: targetHeight}}
      >
        {(_props.destroyOnCollapse ? display : true) && (_props.children || _props.content)}
      </div>
    </div>
  )
}

export default UPanel