import React, { useCallback } from 'react'
import genStyleFromPrpos from "../utils/tools/style.ts"
import genClassNameFromProps from "../utils/tools/className.ts"

import './style.less'

const UrpGridRow = (props) => {

  const rowClass = genClassNameFromProps(
    {
      flex: !!props.justify,
      grid: !props.justify
    },
    '',
    'urp-grid-row'
  )
  const rowStyle = genStyleFromPrpos({
    grids: props.grids,
    gutter: props.gutter + 'px',
    align: props.align,
    justify: props.justify
  })

  // 核心：累加布局偏移量（初始值0）
  const handleChildren = () => {
    let beforeOffset = 0 // 累计偏移量，初始为0
    let beforeSpan = 0
    return React.Children.map(props.children, (child) => {
      // 跳过无效子元素
      if (!React.isValidElement(child)) return child

      // 仅处理UrpGridCol，非Col元素直接返回（不参与累加）
      if (child.type === UrpGridCol) {
        // 1. 获取当前Col自身的offset和span（无值则默认0）
        const colOffset = child.props.offset || 0
        const colSpan = child.props.span || 0

        // 2. 给当前Col传递「累计偏移量」（核心：传给Col作为布局用的offset）
        const clonedCol = React.cloneElement(child, {
          beforeOffset: beforeOffset, // 累计值传给Col
          beforeSpan: beforeSpan,
        })

        // 3. 更新累计偏移量 = 现有值 + 当前Col的offset + 当前Col的span
        beforeOffset += colOffset
        beforeSpan += colSpan
        return clonedCol
      }

      // 非Col元素：直接返回，不参与累加
      return child
    })
  }

  return(
    <div className={rowClass} style={{...rowStyle, ...props.style}}>
      {handleChildren()}
    </div>
  )
}

const UrpGridCol = (props) => {

  const colClass = genClassNameFromProps(
    { 
      reactive: !!props.xs || !!props.sm || !!props.md
                || !!props.lg || !!props.xl || !!props.xxl
    },
    'urp-grid-col',
    'urp-grid-col'
  )

  const getFallbackSizeValue = useCallback((targetSize) => {
  const sizeOrder = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
  const targetIndex = sizeOrder.indexOf(targetSize)

  if (props[targetSize] !== undefined) {
    return props[targetSize]
  }

  for (let i = targetIndex - 1; i >= 0; i--) {
    const prevSize = sizeOrder[i]
    if (props[prevSize] !== undefined) {
      return props[prevSize]
    }
  }

  return props.span ?? 1
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [
  props.xs,
  props.sm,
  props.md,
  props.lg,
  props.xl,
  props.xxl,
  props.span
]) // 依赖数组：仅列出函数内用到的props属性
  
  const colStyle = genStyleFromPrpos({
    span: props.span,
    xsSpan: getFallbackSizeValue('xs'),
    smSpan: getFallbackSizeValue('sm'),
    mdSpan: getFallbackSizeValue('md'),
    lgSpan: getFallbackSizeValue('lg'),
    xlSpan: getFallbackSizeValue('xl'),
    xxlSpan: getFallbackSizeValue('xxl'),
    offset: (props.offset || 0) + props.beforeOffset + props.beforeSpan + 1
  })
  return(
    <div className={colClass} style={{...colStyle, ...props.style}}>{props.children}</div>
  )
}

const UrpGrid = {
  Row: UrpGridRow,
  Col: UrpGridCol
}

export default UrpGrid