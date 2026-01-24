import { Rate, ContextType } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { USpace } from "../Space/index.ts"
import { UIcon } from "../Icon/index.ts"
import "./style.less"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import genStyleFromProps from "../utils/tools/style.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import React from "react"

const Context = createContext<ContextType | null>(null)

/**
 * 评分组件
 * @param props 
 * @returns 
 */
const URate = (props: Rate) => {
  // 合并属性
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'value', 'defaultValue',
      'count', 'disabled', 'allowPartial', 'clearable',
      'color', 'texts', 'gap', 'size', 'icon',
      'onChange'
    ]
  )

  const isControlled = _props.value !== undefined

  // 非受控模式的内部状态
  const [internalIndex, setInternalIndex] = useState(() => 
    Math.trunc(_props.defaultValue || 0)
  )
  const [internalPercent, setInternalPercent] = useState(() => {
    if (!_props.allowPartial || _props.defaultValue === undefined) return 0
    const decimalPart = _props.defaultValue - Math.trunc(_props.defaultValue)
    // 修复浮点数精度问题
    return Number(decimalPart.toFixed(10))
  })

  // 预览状态
  const [previewIconIndex, setPreviewIconIndex] = useState(-1)
  const [previewPercent, setPreviewPercent] = useState(0) 

  // 合并受控/非受控值
  const [finalIndex, finalPercent] = useMemo(() => {
    if (isControlled) {
      const index = Math.trunc(_props.value || 0)
      const percent = _props.value ? Number((_props.value - index).toFixed(10)) : 0
      return [index, percent]
    }
    return [internalIndex, internalPercent]
  }, [isControlled, _props.value, internalIndex, internalPercent])

  /**
   * 图标点击事件
   */
  const handleIconClicked = useCallback((index: number, percent: number) => {
    if (_props.disabled) return
    if (isControlled) {
      // 受控模式
      const targetValue = index + percent
      // 如果点击的是当前值，且开启 clearable，则返回 0
      const currentValue = finalIndex + finalPercent
      const finalValue = _props.clearable && Math.abs(currentValue - targetValue) < 0.001 
        ? 0 
        : targetValue
      _props.onChange?.(finalValue)
      return
    }

    // 非受控模式
    const currentValue = internalIndex + internalPercent
    const targetValue = index + percent
    if (_props.clearable && Math.abs(currentValue - targetValue) < 0.001) {
      setInternalIndex(0)
      setInternalPercent(0)
    } else {
      setInternalIndex(index)
      setInternalPercent(percent)
    }
  }, [
      isControlled, _props.disabled, finalIndex, finalPercent,
      internalIndex, internalPercent, _props.clearable, _props.onChange
    ]
  )

  /**
   * 预览值变化事件
   */
  const handlePreviewChange = useCallback((index: number, percent: number) => {
    if (_props.disabled) return
    setPreviewIconIndex(index)
    setPreviewPercent(percent)
  }, [_props.disabled, setPreviewIconIndex, setPreviewPercent])

  /**
   * 渲染图标
   */
  const renderIcons = () => {
    const icons = []
    const count = Math.max(1, Number(_props.count) || 5)
    for (let i = 0; i < count; i++) {
      icons.push(
        <SingleIcon                             
          key={i}
          index={i}
          iconType={_props.icon}
          onHover={handlePreviewChange}
          onClick={handleIconClicked}
        />
      )
    }
    return icons
  }

  /**
   * 获取当前 value 对应的问题
   */
  const getText = useCallback(() => {
    const value = finalIndex + finalPercent
    const sortedValue = Object.keys(_props.texts).sort((a, b) => Number(b) - Number(a))

    if (!sortedValue.length) return ''

    let text
    for (let i = 0; i < sortedValue.length; i ++) {
      if (value >= Number(sortedValue[i])) {
        text = _props.texts[sortedValue[i]]
        break
      }
    }

    return text

  }, [finalIndex, finalPercent, _props.texts])

  /**
   * 容器类名
   */
  const rateClassName = useMemo(() => {
    return genClassNameFromProps(
      {
        disabled: _props.disabled,
        size: _props.size
      },
      'u-rate',
      'u-rate',
      _props.className
    )
  }, [_props.className, _props.disabled])

  /**
   * 容器动态样式
   */
  const rateStyle = useMemo(() => {
    return genStyleFromProps(
      {
        color: _props.color,
      }
    )
  }, [_props.color])

  /**
   * 上下文 value
   */
  const contextValue: ContextType = useMemo(() => ({
    currIconIndex: finalIndex,
    currPercentage: finalPercent,
    previewIconIndex,
    previewPercentage: previewPercent, 
    allowPartial: _props.allowPartial,
    disabled: _props.disabled
  }), [previewIconIndex, previewPercent, finalIndex, finalPercent, _props.allowPartial, _props.disabled])

  return (
    <Context.Provider value={contextValue}>
      <div
        className={rateClassName}
        style={{...rateStyle, ..._props.style}}
        onMouseLeave={() => setPreviewIconIndex(-1)}
      >
        <USpace gap={_props.gap}>
          {renderIcons()}
          {getText()}
        </USpace>
      </div>
    </Context.Provider>
  )
}

/**
 * 单个图标
 */
const SingleIcon = React.memo((
  props: {
    iconType: string,
    index: number,
    onHover: (index: number, percent: number) => void
    onClick: (index: number, percent: number) => void
  }
) => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Rate 子组件未接收到上下文，请确保 SingleIcon 在 URate 内部使用')
  }

  /**
   * 计算百分比
   */
  const calcPercentage = useCallback((e: React.MouseEvent, index: number) => {
    const iconElement = e.currentTarget
    const rect = iconElement.getBoundingClientRect()

    const offsetX = e.clientX - rect.left
    const percent = Math.min(Math.max(offsetX / rect.width, 0), 1)
    const precisePercent = Math.round(percent * 10) / 10
    
    if (!context.allowPartial && precisePercent > 0) {
      return {
        index: index + 1,
        precisePercent: 0
      }
    }
    return { index, precisePercent }
  }, [context.allowPartial])

  /**
   * 鼠标滑动事件
   */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (context.disabled) return
    const { index, precisePercent } = calcPercentage(e, props.index)
    props.onHover(index, precisePercent)
  }, [context.disabled, props.onHover, props.index, calcPercentage])

  /**
   * 点击事件
   */
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (context.disabled) return
    const { index, precisePercent } = calcPercentage(e, props.index)
    props.onClick(index, precisePercent)
  }, [context.disabled, props.onClick, props.index, calcPercentage])

  /**
   * 动态样式
   */
  const iconStyle = useMemo(() => {
    let percentage = 1

    const isPreview = context.previewIconIndex !== -1
    const targetIndex = isPreview ? context.previewIconIndex : context.currIconIndex
    const targetPercent = isPreview ? context.previewPercentage : context.currPercentage
    
    if (targetIndex > props.index) {
      percentage = 0
    } else if (targetIndex === props.index) {
      percentage = 1 - targetPercent
    }
  
    return genStyleFromProps({
      'clip-path': `inset(0 ${Math.round(percentage * 100)}% 0 0)`
    })
  }, [
    context.previewIconIndex, 
    context.previewPercentage, 
    context.currIconIndex, 
    context.currPercentage, 
    props.index
  ])

  /**
   * 图标类名
   */
  const iconClass = useMemo(() => {
    return genClassNameFromProps(
      {
        active: context.previewIconIndex >= (context.allowPartial ? props.index : props.index + 1),
        disabled: context.disabled
      },
      "u-rate-single-icon",
      "u-rate-single-icon"
    )
  }, [context.previewIconIndex, context.allowPartial, context.disabled,props.index])

  return (
    <span
      className={iconClass}
      style={iconStyle}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <UIcon className="icon icon-unselected" type={props.iconType}/>
      <UIcon className="icon icon-selected" type={props.iconType}/>
    </span>
  )
})

SingleIcon.displayName = 'SingleIcon'

export default URate
