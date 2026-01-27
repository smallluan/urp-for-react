import { PaginationMini } from "./type"
import { paginationMiniDefaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { UButton } from "../Button/index.ts"
import { USpace } from "../Space/index.ts"
import { UInput } from "../Input/index.ts"
import { useCallback, useEffect, useMemo, useState } from "react"

const UPaginationMini = (props: PaginationMini) => {

  // 合并属性
  const { merged: _props } = useMergedProps(
    paginationMiniDefaultProps,
    props,
    [
      'className', 'style', 'total', 'pageSize',
      'current', 'size', 'defaultCurrent', 'disabled',
      'jumpable', 'onCurrentChange'
    ]
  )

  // 当前页数的受控/非受控处理
  const isCurrentControlled = _props.current !== undefined
  const [innerCurrent, setInnerCurrent] = useState(_props.defaultCurrent || 1)
  const finalCurrent = useMemo(() => {
    return isCurrentControlled ? _props.current : innerCurrent
  }, [isCurrentControlled, _props.current, innerCurrent])
  
  // 页码输入框内的值
  const [inputValue, setInputValue] = useState(finalCurrent)

  // 被分成的页数
  const pageCount = useMemo(() => {
    return Math.ceil(_props.total / _props.pageSize)
  }, [_props.total, _props.pageSize])

  // 上一页按钮禁用
  const prevBtnDisabled = useMemo(() => {
    return _props.disabled || finalCurrent === 1
  }, [finalCurrent, _props.disabled])

  // 下一页按钮禁用
  const nextBtnDisabled = useMemo(() => {
    return _props.disabled || finalCurrent === pageCount
  }, [finalCurrent, pageCount, _props.disabled])

  // 点击下一页按钮
  const handleNextBtnClick = useCallback(() => {
    const nextPage = Math.min(finalCurrent + 1, pageCount)
    if (!isCurrentControlled) {
      setInnerCurrent(nextPage)
    }
    _props.onCurrentChange?.(nextPage)
  }, [finalCurrent, _props.total, isCurrentControlled, _props.onCurrentChange, pageCount])

  // 点击上一页按钮
  const handlePrevBtnClick = useCallback(() => {
    const prevPage = Math.max(finalCurrent - 1, 1)
    if (!isCurrentControlled) {
      setInnerCurrent(prevPage)
    }
    _props.onCurrentChange?.(prevPage)
  }, [finalCurrent, isCurrentControlled, _props.onCurrentChange])

  // 输入框值变化处理
  const handleInputChange = useCallback((value: string) => {
    setInputValue(Number(value) ?? 1)
  }, [setInputValue])

  // 输入框失去焦点，将输入框的值同步（区分受控非受控）
  const handleInputBlur = useCallback(() => {
    const validValue = Math.min(Math.max(inputValue, 1), pageCount)
    if (!isCurrentControlled) {
      setInnerCurrent(validValue)
    }
    setInputValue(validValue)
    _props.onCurrentChange?.(validValue)
  }, [inputValue, pageCount, isCurrentControlled, setInnerCurrent, _props.onCurrentChange, setInputValue])

  // 页数变化同步更新到 input
  useEffect(() => {
    setInputValue(finalCurrent)
  }, [finalCurrent, setInputValue])

  return (
    <USpace>
      <UButton
        size={_props.size}
        theme="default"
        variant="text"
        icon="LeftOutlined"
        pureIcon
        onClick={handlePrevBtnClick}
        disabled={prevBtnDisabled}
      />
      {
        _props.jumpable ?
        <UInput
          className="u-pagination-mini-input"
          align="center"
          size={_props.size}
          value={String(inputValue)}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={_props.disabled}
        /> :
        <span className="u-pagination-mini-curr-page">{finalCurrent}</span>
      }
      
      <UButton
        size={_props.size}
        theme="default"
        variant="text"
        icon="RightOutlined"
        pureIcon
        onClick={handleNextBtnClick}
        disabled={nextBtnDisabled}
      />
    </USpace>
  )
}

export default UPaginationMini
