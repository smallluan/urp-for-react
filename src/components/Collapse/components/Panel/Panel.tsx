import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import genClassNameFromProps from "../../../utils/tools/className.ts"
import { Panel } from "./type"
import { UIcon } from "../../../Icon/index.ts"
import useMergedProps from "../../../utils/hooks/useMergedProps.ts"
import defaultProps from "./properties.ts"
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

  const [contentVisible, setContentVisible] = useState(false)
  const [targetHeight, setTargetHeight] = useState('0')

  const isControlled = _props.expand !== undefined
  const [innerExpand, setInnerExpand] = useState(() => {
    return _props.defaultExpand ?? false
  })

  const isExpand = isControlled ? _props.expand : innerExpand

  const isInitRef = useRef(true)
  const contentRef  = useRef(null)
  const timerRef = useRef(null)

  const toogleExpand = useCallback((source: 'icon' | 'row') => {
    if (
      _props.disabled ||
      (!_props.expandOnRowClick && source === 'row')
    ) return
    if (!isControlled) {
      setInnerExpand(prev => {
        return !prev
      })
    }
  }, [])

  useEffect(() => {
    if(!isInitRef.current) {  // 防止组件挂载时触发 onChange
      _props.onChange?.(_props.value, isExpand)
    }
  }, [isExpand])

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
      isInitRef.current = true  // 避免严格模式下的抖动问题
    }
  }, [])

  useEffect(() => {

    if (isInitRef.current) {
      isInitRef.current = false
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (isExpand) {
      setContentVisible(true)
      setTimeout(() => {
        setTargetHeight('auto')
      }, 200)   
    } else {
      if (isInitRef.current) return
      requestAnimationFrame(() => {
        // 确保在下一次重绘之间设置高度为当前高度
        const el = contentRef?.current as HTMLElement | null
        setTargetHeight((el?.scrollHeight ?? '0') + 'px')
        requestAnimationFrame(() => {
          // 确保再设置完高度后再设置为0，实现动画效果
          setTargetHeight('0px')
          // 给退出动画留时间 200 ms
          timerRef.current = setTimeout(() => {
            setContentVisible(false)
          }, 200)
        })
      })
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

  const panelClass = useMemo(() => {
    return genClassNameFromProps(
      { 
        disabled: _props.disabled,
        borderless: _props.borderless
      },
      "u-panel",
      "u-panel"
    )
  }, [_props.disabled, _props.className])

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
            onClick={() => toogleExpand('icon')}
            size={10}
            className={iconClass}
            type={_props.icon || "RightOutlined"}
          />
          <div style={{flex: '1'}}>
            {_props.header}
          </div>
        </USpace>
      </div>

      {/* 被折叠部分 */}
      <div
        ref={contentRef}
        className="u-panel-content"
        style={{ height: targetHeight }}
      >
        {
          (contentVisible || !_props.destroyOnCollapse) &&
          (_props.children || _props.content)
        }
      </div>
    </div>
  )
}

export default UPanel
