import { Pagination } from "./type"
import { paginationDefaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { USelect } from "../Select/index.ts"
import { Select } from "../Select/type"
import { USpace } from "../Space/index.ts"
import { useCallback, useMemo, useState } from "react"
import "./style.less"

const UPagination = (props: Pagination) => {
  // 合并属性
  const { merged: _props } = useMergedProps(
    paginationDefaultProps,
    props,
    [
      'className', 'style', 'defaultPageSize', 'defaultCurrent',
      'pageSizeOptions', 'total', 'pageSize', 'current', 'onPageSizeChange'
    ]
  )


  // pagesize 受控/非受控处理
  const isPageSizeControlled = _props.pageSize !== undefined
  const [innerPageSize, setInnerPageSize] = useState(() => {
    if (_props.pageSizeOptions.includes(_props.defaultPageSize)) {
      return _props.defaultPageSize
    }
    if (_props.pageSizeOptions.length) {
      return _props.pageSizeOptions[0]
    }
    return 5
  })
  const finalPageSize = useMemo(() => (
    isPageSizeControlled ? _props.pageSize : innerPageSize
  ), [_props.pageSize, innerPageSize, isPageSizeControlled])


  // current 受控/非受控处理
  const isCurrentControlled = _props.current !== undefined
  const [innerCurrent] = useState(() => {
    if (typeof _props.defaultCurrent === 'number') {
      return Math.abs(_props.defaultCurrent)
    } else {
      return 1
    }
  })
  const finalCurrent = useMemo(() => (
    isCurrentControlled ? _props.current : innerCurrent
  ), [isCurrentControlled, _props.current, innerCurrent])


  /**
   * 页数尺寸 select 的选项 
   */
  const selectOptions = useMemo(() => (
    _props.pageSizeOptions.map(size => ({
      label: `${size}条/页`, value: size
    }))
  ), [_props.pageSizeOptions])


  /**
   * 总页数
   */
  const pageCount = useMemo(() => (
    Math.ceil(_props.total / finalPageSize)
  ), [_props.total, finalPageSize])


  /**
   * select 选择器 pagesize 大小变化
   */
  const handlePageSizeChange = useCallback((newPageSize: Select['value']) => {
    if (!newPageSize) return
    if (isPageSizeControlled) {
      _props.onPageSizeChange?.(Number(newPageSize))
    } else {
      setInnerPageSize(Number(newPageSize))
    }
  }, [isPageSizeControlled, _props.onPageSizeChange])


  return (
    <USpace>
      <div>共{_props.total}条数据</div>
      <USelect
        options={selectOptions}
        value={finalPageSize}
        onChange={handlePageSizeChange}
      />
      <div>共{pageCount}页</div>
      <div>当前{finalCurrent}页</div>
    </USpace>
  )
}

export default UPagination
