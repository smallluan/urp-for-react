import { FixedSizeList as List } from 'react-window'
import { VirtualListConfig, ListItemProps, ListProps, VirtualListProps } from "./type"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { ListDefaultProps } from "./properties.ts"
import { useMemo, useCallback, forwardRef } from 'react'
import React from 'react'
import { USpace } from '../Space/index.ts'
import { UGrid } from "../Grid/index.ts"

const VIRTUAL_LIST_DEFAULT_CONFIG: Partial<VirtualListConfig> = {
  initialScrollOffset: 0,
  overscanCount: 5,
  ignoreScrollEvent: false
}

const UList = forwardRef<HTMLDivElement, ListProps>((props) => {
  // 合并props
  const { merged: _props } = useMergedProps(
    ListDefaultProps,
    props,
    [
      'className',
      'style',
      'header',
      'footer',
      'split',
      'gap',
      'width',
      'height',
      'type',
      'virtual',
      'children',
      'onScroll'
    ]
  )

  const itemElements = useMemo(() => {
    const validItems = React.Children.toArray(_props.children).filter(item => 
      React.isValidElement(item) && item.type === UListItem
    ) as React.ReactElement<ListItemProps>[]

    const processedItems = validItems.map(item => {
      if (item.props.action) {
        return (
          <UGrid.Row key={item.key} justify='space-between' align='start'>
            {item}
            {item.props.action}
          </UGrid.Row>
        )
      }
      // 无 action 则返回原元素
      return item
    })
    if (_props.type === 'virtual' && _props.virtual?.count !== processedItems.length) {
      console.warn(`虚拟列表count(${_props.virtual?.count})与实际列表项数量(${processedItems.length})不匹配，已自动修正`)
    }
    return processedItems
  }, [_props.children, _props.type, _props.virtual?.count])

  const renderList = useMemo(() => {
    if (_props.type === 'virtual') {
      // 虚拟列表逻辑
      const { virtual } = _props
      const {
        count = itemElements.length,
        size: originSize, 
        initialScrollOffset,
        overscanCount,
        onItemsRendered
      } = {
        ...VIRTUAL_LIST_DEFAULT_CONFIG,
        ...virtual
      }

      const baseItemSize = originSize || 40
      const itemSizeWithGap = baseItemSize + _props.gap

      return (
        <UVirtualList
          ref={undefined}
          height={_props.height}
          count={count}
          size={itemSizeWithGap}
          gap={_props.gap}
          initialScrollOffset={initialScrollOffset}
          overscanCount={overscanCount}
          onItemsRendered={onItemsRendered}
          onScroll={_props.onScroll}
        >
          {itemElements}
        </UVirtualList>
      )
    }
    return (
      <USpace direction='vertical' gap={_props.gap} align='start' overflow='scroll'>
        {itemElements}
      </USpace>
    )
  }, [_props.virtual, _props.type, _props.height, _props.gap, itemElements])

  return (
    <USpace
      direction='vertical'
      align='start'
      className={_props.className}
      style={_props.style}
      gap={_props.gap}
    >
      {_props.header}
      <div
        style={{
          width: _props.width,
          height: _props.height,
          ...(_props.type === 'virtual' ? { paddingBottom: -_props.gap } : {})
        }}
      >
        {renderList}
      </div>
      {_props.footer}
    </USpace>
  )
})

const UVirtualList = forwardRef<HTMLDivElement, VirtualListProps>((props, ref) => {
  const renderRow = useCallback(({ index, style }: { index: number, style: React.CSSProperties }) => {
    const itemElement = props.children[index]
    if (!itemElement) return null

    // 判断是否是最后一项
    const isLastItem = index === props.count - 1

    const itemStyle = {
      ...style,
      ...(itemElement.props.style || {}),
      boxSizing: 'border-box',
      marginBottom: isLastItem ? 0 : `${props.gap}px`,
      height: `${props.size - props.gap}px`
    }

    return React.cloneElement(itemElement, {
      key: itemElement.key || `list-item-${index}`,
      style: itemStyle
    })
  }, [props.children, props.count, props.gap, props.size])

  return (
    <List
      ref={ref}
      height={props.height}
      itemCount={props.count}
      itemSize={props.size} // 使用包含gap的总高度
      width="100%"
      initialScrollOffset={props.initialScrollOffset}
      overscanCount={props.overscanCount}
      onItemsRendered={props.onItemsRendered}
      onScroll={props.onScroll}
    >
      {renderRow}
    </List>
  )
})

const UListItem = (props: ListItemProps) => {
  return (
    <div 
      style={{ 
        flex: '1',
        ...props.style 
      }}
    >
      {props.children}
    </div>
  )
}

UList.displayName = 'UList'
UVirtualList.displayName = 'UVirtualList'
UList.Item = UListItem

export default UList