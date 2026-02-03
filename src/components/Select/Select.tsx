import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { UIcon } from "../Icon/index.ts"
import { UPopup } from "../Popup/index.ts"
import { USpace } from "../Space/index.ts"
import Icons from "./components/Icons.tsx"
import Options from "./components/Options.tsx"
import useClickOutside from "../utils/hooks/useClickOutside.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { Select } from "./type"
import { defaultProps, formatProps } from "./properties.ts"
import SelectContext from "./Context.ts"
import "./style.less"

const USelect = (props: Select) => {
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'multiple', 'options', 'defaultValue', 'value', 'clearable', 'inputable',
      'hideSelected', 'hideRadioCircle', 'cancleable', 'selectLimit', 'onChange',
      'borderless', 'size', 'maxVisibleNum', 'position', 'className', 'style'
    ],
    formatProps
  )
  const {
    multiple, options, defaultValue, value, clearable, inputable,
    hideSelected, hideRadioCircle, cancleable, selectLimit, onChange,
    borderless, size
  } = _props  // 解构进行依赖精细化管理

  const [mouseEnter, setMouseEnter] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const selectRef = useRef(null)  // 用于判断鼠标点击时的点击位置，从而设置聚焦状态
  const ignoreRefs = useRef(null)
  const inputRef = useRef(null)

  useClickOutside(
    selectRef,
    () => setIsFocus(false),
    {
      disabled: !isFocus,
      ignoreRefs: _props.multiple ? [ignoreRefs] : []
    },
  )

  // memo —— Select 类
  const selectClass = useMemo(() => {
    return genClassNameFromProps(
      {
        size: size,
        hover: mouseEnter,
        focus: isFocus,
        borderless: borderless
      },
      'u-select',
      'u-select'
    )
  }, [isFocus, mouseEnter, borderless])


  const popupClass = useMemo(() => {
    return genClassNameFromProps(
      { size: size },
      'u-select-popup',
      'u-select-popup'
    )
  }, [size])

  // memo —— 输入框显示条件
  const showInput = useMemo(() => {
    // 当属性为可输入，且组件被聚焦时显示输入框
    return inputable && isFocus
  }, [inputable, isFocus])

  // memo —— 单选值容器的显示条件
  const showSingleSelected = useMemo(() => {
    return (
      !multiple &&
      !(inputable && isFocus)
    )
  }, [multiple, inputable, isFocus])

  // memo —— 多选值容器的显示条件
  const showMutipleSelected = useMemo(() => {
    return (
      multiple &&
      !(inputable && isFocus)
    )
  }, [multiple, inputable, isFocus])

  const setFoucsState = useCallback(() => {
    setIsFocus(!isFocus)
  }, [isFocus])

  // callback —— 清空选值
  const handleClearValue = useCallback(() => {
    if (multiple) {
      onChange?.([])
    } else {
      onChange?.('')
    }
  }, [multiple, onChange])

  // context —— 提供的上下文
  const contextValue = useMemo(() => ({
    multiple: multiple,
    options: options,
    defaultValue: defaultValue,
    value: value,
    isFocus: isFocus,
    mouseEnter: mouseEnter,
    clearable: clearable,
    hideRadioCircle: hideRadioCircle,
    hideSelected: hideSelected,
    cancleable: cancleable,
    selectLimit: selectLimit,
    onChange: onChange,
    onClearValue: handleClearValue,
    setIsFocus: setIsFocus,
  }), [
    options, defaultValue, value, onChange, clearable, isFocus, 
    handleClearValue, cancleable, hideRadioCircle, hideSelected, 
    mouseEnter, multiple, selectLimit
  ])

  const genMutiDisplayElems = useCallback(() => {
    const elems = _props.value.map(value => {
      const targetOpt = _props.options.find(opt => opt.value === value)
      if (targetOpt) {
        return (
          <USpace
            style={{ width: 'fit-content' }}
            className="u-select-selected-muti"
            key={value}
          >
            <span>{targetOpt?.label}</span>
            <UIcon
              className="u-select-icon"
              type="CloseOutlined"
              onClick={() => {
                _props.onChange(_props.value.filter(v => v !== value))
              }}
            />
          </USpace>
        )
      }
    })
    if (_props.maxVisibleNum > 0 && elems.length > _props.maxVisibleNum) {
      return(
        <>
          {elems.slice(0, _props.maxVisibleNum)}
          <div className="u-select-selected-muti">+{elems.length - _props.maxVisibleNum}</div>
        </>
      )
    } 
    return elems
  })


  // 设置 popup 宽度与 select 保持一致
  const [targetWidth, setTargetWidth] = useState(0)
  useEffect(() => {
    if (selectRef.current) {
      const width = selectRef.current.offsetWidth
      setTargetWidth(width)
      
      const handleResize = () => {
        setTargetWidth(selectRef.current?.offsetWidth ?? 0)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []) 

  const contentStyle = useMemo(() => ({
    width: `${targetWidth || 0}px` 
  }), [targetWidth])
  return (
    <SelectContext.Provider value={contextValue}>
      <UPopup
        trigger="click"
        className={popupClass}
        position={_props.position}
        visible={isFocus}
        contentStyle={contentStyle}
        // contentClassName="u-select-popup-content"
        arrow
        content={
          <div style={{ width: '100%' }}>
            <USpace direction="vertial" gap={8}>
              <Options ref={ignoreRefs} />
            </USpace>
          </div>
        }
      >
        <div
          ref={selectRef}
          className={selectClass}
          style={_props.style}
          tabIndex={0}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
          onClick={setFoucsState}
        >
          {/* 单选选中项容器 */}
          {
            showSingleSelected &&
            <div className="u-select-selected">
              {
                _props.options.find(item => item.value === _props.value)?.label || ''
              }
            </div>
          }
          {/* 多选选中项容器 */}
          {
            showMutipleSelected &&
            <USpace scrollBar="none" overflow="scroll" gap={4}>
              {genMutiDisplayElems()}
            </USpace>
          }
          {
            showInput &&
            <input
              ref={inputRef}
              autoFocus={true}
              defaultValue={_props.options.find(item => item.value === _props.value)?.label || ''}
              onBlur={() => {
                const targetOption = _props.options.find(opt => (
                  opt.label === inputRef.current.value
                ))
                if (targetOption === undefined) {
                  _props.onChange('')
                } else {
                  _props.onChange(targetOption.value)
                }
              }}
              className="u-select-input"
              type="text"
            />
          }
          <Icons />
        </div>
      </UPopup>
    </SelectContext.Provider>
  )
}

export default USelect
