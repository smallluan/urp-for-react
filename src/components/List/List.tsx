import { FixedSizeList as List } from 'react-window'
import { VirtualListConfig, ListItemProps, ListProps, VirtualListProps } from "./type"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { ListDefaultProps } from "./properties.ts"
import { useMemo, useCallback, forwardRef } from 'react'
import React from 'react'
import { USpace } from '../Space/index.ts'

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

  // 生成列表项，补充完整依赖项，确保仅在children变化时重新计算
  const itemElements = useMemo(() => {
    const validItems = React.Children.toArray(_props.children).filter(item => 
      React.isValidElement(item) && item.type === UListItem
    ) as React.ReactElement<ListItemProps>[]
    if (_props.type === 'virtual' && _props.virtual?.count !== validItems.length) {
      console.warn(`虚拟列表count(${_props.virtual?.count})与实际列表项数量(${validItems.length})不匹配，已自动修正`)
    }
    return validItems
  }, [_props.children, _props.type, _props.virtual?.count])


  const renderList = useMemo(() => {
    if (_props.type === 'virtual') {
      // 虚拟列表逻辑
      const { virtual } = _props
      const {
        count = itemElements.length, // 优先使用实际列表项数量
        size,
        initialScrollOffset,
        overscanCount,
        onItemsRendered
      } = {
        ...VIRTUAL_LIST_DEFAULT_CONFIG,
        ...virtual
      }
      return (
        <UVirtualList
          height={_props.height}
          count={count}
          size={size}
          initialScrollOffset={initialScrollOffset}
          overscanCount={overscanCount}
          onItemsRendered={onItemsRendered}
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
  }, [_props.virtual, _props.type, _props.height, _props.gap])


  return (
    <div
      className={_props.className}
      style={{
        width: _props.width,
        height: _props.height,
        gap: `${_props.gap}px`,
        border: '1px solid red',
        ..._props.style
      }}
    >
      {_props.header}
      {renderList}
      {_props.footer}
    </div>
  )

})


const UVirtualList = forwardRef<HTMLDivElement, VirtualListProps>((props, ref) => {
  const renderRow = useCallback(({ index, style }: { index: number, style: React.CSSProperties }) => {
    const itemElement = props.children[index]
    if (!itemElement) return null

    return React.cloneElement(itemElement, {
      key: itemElement.key || `list-item-${index}`,
      style: {
        ...style,
        ...(itemElement.props.style || {}),
      }
    })
  }, [props.children])

  return (
    <List
      ref={ref}
      height={props.height}
      itemCount={props.count}
      itemSize={props.size}
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
        // height: '100%',
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
