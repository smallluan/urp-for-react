import React, { useCallback, useMemo } from 'react'
import genStyleFromProps from "../utils/tools/style.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { GridRow, GridCol } from './type'
// import { rowDefaultProps, colDefaultProps } from './properties.ts'

import './style.less'

const UGridRow = (props: GridRow) => {

  const rowClass = genClassNameFromProps(
    {
      flex: !!props.justify,
      grid: !props.justify
    },
    '',
    'u-grid-row'
  )
  const rowStyle = genStyleFromProps({
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

      // 仅处理UGridCol，非Col元素直接返回（不参与累加）
      if (child.type === UGridCol) {
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

const UGridCol = (props: GridCol) => {

  const colClass = genClassNameFromProps(
    { 
      reactive: !!props.xs || !!props.sm || !!props.md
                || !!props.lg || !!props.xl || !!props.xxl
    },
    'u-grid-col',
    'u-grid-col'
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
  
  const colStyle = useMemo(() => {
    let offset = props.offset || 0

    if (props.beforeOffset && props.beforeSpan) {
      offset = props.beforeOffset + props.beforeSpan + 1
    } else {
      offset += 1
    }
  
    return (
      genStyleFromProps({
        span: props.span,
        xsSpan: getFallbackSizeValue('xs'),
        smSpan: getFallbackSizeValue('sm'),
        mdSpan: getFallbackSizeValue('md'),
        lgSpan: getFallbackSizeValue('lg'),
        xlSpan: getFallbackSizeValue('xl'),
        xxlSpan: getFallbackSizeValue('xxl'),
        offset: offset
      })
    )
  }, [props.beforeOffset, props.beforeSpan, props.offset])
  return(
    <div className={colClass + ' ' + props.className} style={{...colStyle, ...props.style}}>{props.children}</div>
  )
}

const UGrid = {
  Row: UGridRow,
  Col: UGridCol
}

export default UGrid