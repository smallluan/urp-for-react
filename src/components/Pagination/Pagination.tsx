import { Pagination, PaginationButtons, PaginationButton, PrevNextButton, EllipsisButton } from "./type"
import { paginationDefaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { USelect } from "../Select/index.ts"
import { Select } from "../Select/type"
import { USpace } from "../Space/index.ts"
import { UInput } from "../Input/index.ts"
import { UIcon } from "../Icon/index.ts"
import { UGrid } from "../Grid/index.ts"
import { useCallback, useMemo, useState } from "react"
import "./style.less"
import genClassNameFromProps from "../utils/tools/className.ts"
import UPaginationMini from "./PaginationMini.tsx"


const UPagination = (props: Pagination) => {
  // 合并属性
  const { merged: _props } = useMergedProps(
    paginationDefaultProps,
    props,
    [
      'className', 'style', 'defaultPageSize', 'defaultCurrent',
      'pageSizeOptions', 'total', 'pageSize', 'current',
      'showJumper', 'maxPageBtn', 'foldedMaxPageBtn', 'showFirstAndLastPageBtn',
      'showPreviousAndNextBtn', 'showPageSizeOptions',
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


  // 页数输入框的值（不能简单和 finalCurrent 绑定，否则会有问题）
  const [pageInputValue, setPageInputValue] = useState(finalCurrent)


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
    setPageInputValue(newPageIndex)
  }, [isCurrentControlled, _props.onCurrentChange])


  return (
    <UGrid.Row justify="space-between" align="center">
      <div>共 {_props.total} 条数据</div>
      <USpace>
        {
          _props.showPageSizeOptions &&
          <USelect
            style={{ width: '100px' }}
            options={selectOptions}
            value={finalPageSize}
            onChange={handlePageSizeChange}
          />
        }
        <UPaginationButtons
          pageCount={pageCount}
          current={finalCurrent}
          maxPageBtn={_props.maxPageBtn}
          foldedMaxPageBtn={_props.foldedMaxPageBtn}
          showFirstAndLastPageBtn={_props.showFirstAndLastPageBtn}
          showPreviousAndNextBtn={_props.showPreviousAndNextBtn}
          onButtonClick={handlePageChange}
        />
        {/* 快速跳转区域 */}
        {
          _props.showJumper &&
          <USpace className="u-pagination-quick-jump">
            <span>跳至</span>
            <UInput
              className="u-pagination-input"
              align="center"
              value={String(pageInputValue)}
              onChange={(value) => {
                const page = Number(value)
                setPageInputValue(Number(page))
              }}
              onBlur={() => {
                if (pageInputValue >= 1 && pageInputValue <= pageCount) {
                  if (isCurrentControlled) {
                    _props.onCurrentChange?.(pageInputValue)
                  } else {
                    setInnerCurrent(pageInputValue)
                  }
                } else {
                  setPageInputValue(finalCurrent)
                }
              }}
            />
            <span>/ {pageCount}</span>
          </USpace>
        }
       
      </USpace>
    </UGrid.Row>
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

    // 上一个/下一个按钮
    if (props.showPreviousAndNextBtn) {
      buttons.unshift(
        <UPrevNextButton
          type="prev"
          current={props.current}
          pageCount={props.pageCount}
          disabled={props.current === 1}
          onClick={props.onButtonClick}
        />
      )
      buttons.push(
        <UPrevNextButton
          type="next"
          current={props.current}
          pageCount={props.pageCount}
          disabled={props.current === props.pageCount}
          onClick={props.onButtonClick}
        />
      )
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

    if (props.showFirstAndLastPageBtn) {
      if (props.current - leftCount > 1) {
        if (props.current - leftCount > 2) {
          buttons.unshift(
            <UEllipsisButton
              type="prev"
              current={props.current}
              pageCount={props.pageCount}
              foldedMaxPageBtn={props.foldedMaxPageBtn}
              disabled={false}
              onClick={props.onButtonClick}
            />
          )
        }
        buttons.unshift(
          <UPaginationButton
            onClick={props.onButtonClick}
            pageIndex={1}
            active={false}
          />
        )
      }

      if (props.current + rightCount < props.pageCount) {
        if (props.current + rightCount < props.pageCount - 1) {
          buttons.push(
            <UEllipsisButton
              type="next"
              current={props.current}
              pageCount={props.pageCount}
              foldedMaxPageBtn={props.foldedMaxPageBtn}
              disabled={false}
              onClick={props.onButtonClick}
            />
          )
        }
        buttons.push(
          <UPaginationButton
            onClick={props.onButtonClick}
            pageIndex={props.pageCount}
            active={false}
          />
        )
      }
    }

    // 上一个/下一个按钮
    if (props.showPreviousAndNextBtn) {
      buttons.unshift(
        <UPrevNextButton
          type="prev"
          current={props.current}
          pageCount={props.pageCount}
          disabled={props.current === 1}
          onClick={props.onButtonClick}
        />
      )
      buttons.push(
        <UPrevNextButton
          type="next"
          current={props.current}
          pageCount={props.pageCount}
          disabled={props.current === props.pageCount}
          onClick={props.onButtonClick}
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

/**
 * 上一个/下一个按钮
 */
const UPrevNextButton = (props: PrevNextButton) => {

  const handleClick = useCallback(() => {
    if (props.disabled) return
    if (props.type === 'next') {
      if (props.current < props.pageCount) {
        props.onClick(props.current + 1)
      }
    } else {
      if (props.current > 1) {
        props.onClick(props.current - 1)
      }
    }
  }, [props.disabled, props.type, props.current, props.pageCount])

  const btnClassName = useMemo(() => {
    return genClassNameFromProps(
      {disabled: props.disabled},
      "u-pagination-prev-next-button",
      "u-pagination-prev-next-button"
    )
  }, [props.disabled])

  return (
    <div
      className={btnClassName}
      onClick={handleClick}
    >
      <UIcon type={props.type === 'prev' ? 'LeftOutlined' : 'RightOutlined'} />
    </div>
  )
}


/**
 * Ellipsis 按钮
 */
const UEllipsisButton = (props: EllipsisButton) => {

  const [isHover, setIsHover] = useState(false)

  const btnClassName = useMemo(() => {
    return genClassNameFromProps(
      {
        disabled: props.disabled,
        hover: isHover
      },
      "u-pagination-ellipsis-button",
      "u-pagination-ellipsis-button"
    )
  }, [props.disabled, isHover])

  const iconType = useMemo(() => {
    if (!isHover) return "EllipsisOutlined"
    if (props.type === "prev") {
      return "DoubleLeftOutlined"
    } else {
      return "DoubleRightOutlined"
    }
  }, [props.type, isHover])

  const handleClick = () => {
    if (props.disabled) return
    if (props.type === 'prev') {
      props.onClick(Math.max(1, props.current - props.foldedMaxPageBtn))
    } else {
      props.onClick(Math.min(props.pageCount, props.current + props.foldedMaxPageBtn))
    }
  }

  return (
    <div
      className={btnClassName}
      onClick={handleClick}
      onMouseEnter={() => {
        if (props.disabled) return
        setIsHover(true)
      }}
      onMouseLeave={() => setIsHover(false)}
    >
      <UIcon type={iconType} />
    </div>
  )
}

UPagination.Mini = UPaginationMini

export default UPagination
