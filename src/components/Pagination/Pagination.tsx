import { Pagination, PaginationButtons, PaginationButton } from "./type"
import { paginationDefaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { USelect } from "../Select/index.ts"
import { Select } from "../Select/type"
import { USpace } from "../Space/index.ts"
import { UInput } from "../Input/index.ts"
import { useCallback, useMemo, useState } from "react"
import "./style.less"
import genClassNameFromProps from "../utils/tools/className.ts"


const UPagination = (props: Pagination) => {
  // 合并属性
  const { merged: _props } = useMergedProps(
    paginationDefaultProps,
    props,
    [
      'className', 'style', 'defaultPageSize', 'defaultCurrent',
      'pageSizeOptions', 'total', 'pageSize', 'current',
      'showJumper', 'maxPageBtn', 'foldedMaxPageBtn', 'showFirstAndLastPageBtn',
      'onPageSizeChange', 'onCurrentChange'
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
  const [innerCurrent, setInnerCurrent] = useState(() => {
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
    handlePageChange(1)
  }, [isPageSizeControlled, _props.onPageSizeChange])


  /**
   * 页面切换事件
   */
  const handlePageChange = useCallback((newPageIndex: number) => {
    if (isCurrentControlled) {
      _props.onCurrentChange?.(newPageIndex)
    } else {
      setInnerCurrent(newPageIndex)
    }
  }, [isCurrentControlled, _props.onCurrentChange])


  return (
    <USpace>
      <div>共{_props.total}条数据</div>
      <USelect
        options={selectOptions}
        value={finalPageSize}
        onChange={handlePageSizeChange}
      />
      <UPaginationButtons
        pageCount={pageCount}
        current={finalCurrent}
        maxPageBtn={_props.maxPageBtn}
        foldedMaxPageBtn={_props.foldedMaxPageBtn}
        showFirstAndLastPageBtn={_props.showFirstAndLastPageBtn}
        onButtonClick={handlePageChange}
      />
      <USpace style={{width: 'fit-content'}}>
        <span>跳至</span>
        <UInput value={String(finalCurrent)} align="center" />
        <span>/ {pageCount}</span>
      </USpace>
    </USpace>
  )
}

const UPaginationButtons = (props: PaginationButtons) => {

  /**
   * 分页的数量没有超过 maxPageBtn 则全部显示即可
   */
  const renderAllButtons = () => {
    const buttons = []
    for (let i = 1; i < props.pageCount + 1; i ++) {
      if (i === props.current) {
        buttons.push(
          <UPaginationButton
            onClick={props.onButtonClick}
            pageIndex={i}
            active={true}
          />
        )
      } else {
        buttons.push(
          <UPaginationButton
            onClick={props.onButtonClick}
            pageIndex={i}
            active={false}
          />
        )
      }
    }

    return (
      <USpace style={{width: 'fit-content'}}>{buttons}</USpace>
    )
  }


  /**
   * 分页数量超过 maxPageBtn
   */
  const renderPartialButtons = () => {
    // 除了当前被选中按钮页数，还需要额外展示的按钮数量
    const extraButtonCount = props.foldedMaxPageBtn - 1
    let leftCount = Math.floor(extraButtonCount / 2)
    let rightCount = extraButtonCount - leftCount

    // 右侧超出总页数时，调整左右数量，保证右侧不超出
    const maxRightIndex = props.current + rightCount
    if (maxRightIndex > props.pageCount) {
      const exceedRight = maxRightIndex - props.pageCount
      rightCount = Math.max(0, rightCount - exceedRight)
      leftCount = extraButtonCount - rightCount
    }

    // 左侧小于 1 时，调整左侧数量，保证左侧不超出
    const minLeftIndex = props.current - leftCount
    if (minLeftIndex < 1) {
      // 左侧不足的部分，从右侧扣（补到左侧）
      const exceedLeft = 1 - minLeftIndex
      leftCount = Math.max(0, leftCount - exceedLeft)
      rightCount = extraButtonCount - leftCount
    }

    // 这里每一个按钮项都不能保留 key，防止 react 复用 dom 导致的动画残留
    const buttons = []
    
    // 左侧按钮
    for (let i = leftCount; i > 0; i --) {
      const index = props.current - i
      buttons.push(
        <UPaginationButton
          onClick={props.onButtonClick}
          pageIndex={index}
          active={false}
        />
      )
    }

    buttons.push(
      <UPaginationButton
        onClick={props.onButtonClick}
        pageIndex={props.current}
        active={true}
      />
    )

    // 右侧按钮
    for (let i = 1; i < rightCount + 1; i ++) {
      const index = props.current + i
      buttons.push(
        <UPaginationButton
          onClick={props.onButtonClick}
          pageIndex={index}
          active={false}
        />
      )
    }


    return buttons
  }


  return (
    <>
      {
        props.pageCount <= props.maxPageBtn ?
        renderAllButtons() :
        renderPartialButtons()
      }
    </>
  )
}

const UPaginationButton = (props: PaginationButton) => {
  const buttonClassName = useMemo(() => {
    return genClassNameFromProps(
      { active: props.active },
      "u-pagination-button",
      "u-pagination-button"
    )
  }, [props.active])

  return (
    <div
      className={buttonClassName}
      onClick={() => props.onClick(props.pageIndex)}
    >
      {props.pageIndex}
    </div>
  )
}

export default UPagination
