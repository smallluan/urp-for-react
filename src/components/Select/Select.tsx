import { Select, Context } from "./type"
import genClassNameFromProps from "../utils/tools/className.ts"

import { UrpIcon } from "../Icon/index.ts"
import { UrpPopup } from "../Popup/index.ts"
import { UrpCheckBox } from "../CheckBox/index.ts"
import { UrpSpace } from "../Space/index.ts"
// import { UrpButton } from "../Button/index.ts"
// import { UrpGrid } from "../Grid/index.ts"
import { selectDefaultProps } from "./properties.ts"

import classNames from "classnames"

import useClickOutside from "../utils/hooks/useClickOutside.ts"

import "./style.less"
import { createContext, forwardRef, useCallback, useContext, useMemo, useRef, useState } from "react"

const SelectContext = createContext<Context | undefined>(undefined)

const UrpSelect = (props: Select) => {

  const _props = { ...selectDefaultProps, ...props }

  // state —— 鼠标进入组件
  const [mouseEnter, setMouseEnter] = useState(false)
  // state —— 组件聚焦
  const [isFocus, setIsFocus] = useState(false)
  // ref —— Select 组件自身，用于判断鼠标点击时的点击位置，从而设置聚焦状态
  const selectRef = useRef(null)
  const ignoreRefs = useRef(null)
  // ref —— Inputable 属性相关，当 Select 可输入时的输入框 
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
        hover: mouseEnter,
        focus: isFocus,
        borderless: _props.borderless
      },
      'u-select',
      'u-select'
    )
  }, [isFocus, mouseEnter, _props.borderless])


  const popupClass = useMemo(() => {
    return genClassNameFromProps(
      { size: _props.size },
      'u-select-popup',
      'u-select-popup'
    )
  }, [_props.size])

  // memo —— 输入框显示条件
  const showInput = useMemo(() => {
    // 当属性为可输入，且组件被聚焦时显示输入框
    return _props.inputable && isFocus
  }, [_props.inputable, isFocus])

  // memo —— 单选值容器的显示条件
  const showSingleSelected = useMemo(() => {
    return (
      !_props.multiple &&
      !(_props.inputable && isFocus)
    )
  }, [_props.multiple, _props.inputable, isFocus])

  // memo —— 多选值容器的显示条件
  const showMutipleSelected = useMemo(() => {
    return (
      _props.multiple &&
      !(_props.inputable && isFocus)
    )
  }, [_props.multiple, _props.inputable, isFocus])

  const setFoucsState = useCallback(() => {
    setIsFocus(!isFocus)
  }, [isFocus])

  // callback —— 清空选值
  const handleClearValue = useCallback(() => {
    if (_props.multiple) {
      _props.onChange?.([])
    } else {
      _props.onChange?.('')
    }
  }, [props.multiple, _props.onChange])

  // context —— 提供的上下文
  const contextValue = useMemo(() => ({
    multiple: _props.multiple,
    options: _props.options,
    defaultValue: _props.defaultValue,
    value: _props.value,
    isFocus: isFocus,
    mouseEnter: mouseEnter,
    clearable: _props.clearable,
    hideRadioCircle: _props.hideRadioCircle,
    hideSelected: _props.hideSelected,
    cancleable: _props.cancleable,
    selectLimit: _props.selectLimit,
    onChange: _props.onChange,
    onClearValue: handleClearValue,
    setIsFocus: setIsFocus,
  }), [_props.options, _props.defaultValue, _props.value, _props.onChange, _props.clearable, isFocus, handleClearValue])


  const genMutiDisplayElems = useCallback(() => {
    const elems = _props.value.map(value => {
      const targetOpt = _props.options.find(opt => opt.value === value)
      if (targetOpt) {
        return (
          <UrpSpace
            style={{ width: 'fit-content' }}
            className="u-select-selected-muti"
            key={value}
          >
            <span>{targetOpt?.label}</span>
            <UrpIcon
              className="u-select-icon"
              type="CloseOutlined"
              onClick={() => {
                _props.onChange(_props.value.filter(v => v !== value))
              }}
            />
          </UrpSpace>
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

  return (
    <SelectContext.Provider value={contextValue}>
      <UrpPopup
        trigger="click"
        className={popupClass}
        position={props.position}
      >
        <div
          ref={selectRef}
          className={selectClass}
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
            <UrpSpace scrollBar="none" overflow="scroll" gap={4}>
              {genMutiDisplayElems()}
            </UrpSpace>
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
        <UrpPopup.Content
          position={_props.position}
          visible={isFocus}
          className="u-select-pop-content"
          arrow
        >
          <div style={{ width: '100%' }}>
            <UrpSpace direction="vertial" gap={8}>
              <Options ref={ignoreRefs} />
              {/* <Footer/>  */}
            </UrpSpace>
          </div>
        </UrpPopup.Content>
      </UrpPopup>
    </SelectContext.Provider>
  )
}

/**
 * 选项组件
 */
const Options = forwardRef<HTMLDivElement, any>((props, ref) => {
  const context = useContext(SelectContext) as Required<Context>
  if (!context) {
    throw new Error("Select 组件中 Options 未获取上下文数据")
  }

  const filtedOptions = useMemo(() => {
    if (context.hideSelected) {
      return context.options.filter(opt => opt.value !== context.value)
    }
    return context.options
  }, [context.options])

  return (
    <div style={{ width: '100%' }} ref={ref}>
      <UrpCheckBox.Group
      onChange={(newValue: Context['value']) => {
        context.onChange?.(newValue)
      }}
      defaultValue={context.defaultValue}
      multiple={context.multiple}
      cancelable={context.cancleable}
      selectLimit={context.selectLimit}
      value={context.value}
    >
      <UrpSpace direction="vertial" gap={4}>
        {
          filtedOptions.map((item) => (
            <UrpCheckBox.Item
              key={item.value}
              labelOnly={!context.multiple && context.hideRadioCircle}
              className="check-box"
              value={item.value}
            >
              <div className={classNames("check-box-label", { "check-box-label-checked": item.value === context.value })}>{item.label}</div>
            </UrpCheckBox.Item>
          ))
        }
      </UrpSpace>
    </UrpCheckBox.Group>
    </div>
    
  )
})

Options.displayName = 'Option'

/**
 * 图标组件
 */
const Icons = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("Select 组件中 Icons 未获取上下文数据")
  }

  const arrowIconClass = useMemo(() => {
    return genClassNameFromProps(
      {
        down: !context.isFocus,
        up: context.isFocus,
      },
      'u-select-icon-arrow',
      'u-select-icon-arrow'
    )
  }, [context.isFocus])

  const showCloseIcon = useMemo(() => {
    return (
      context.clearable &&
      (context.mouseEnter || context.isFocus) &&
      (
        context.multiple ?
          context.value?.length !== 0 :
          context.value !== ''  // checkbox 好像单选的时候什么都没选中返回的是空字符
      )
    )
  }, [context.clearable, context.mouseEnter, context.isFocus, context.multiple, context.value])

  return (
    <UrpSpace
      className="u-select-icons"
      gap={4}
    >
      {
        showCloseIcon ?
          <UrpIcon
            onClick={context.onClearValue}
            className="u-select-icon"
            type="CloseCircleOutlined"
          />
          :
          <UrpIcon
            className={arrowIconClass}
            type="DownOutlined"
          />
      }
    </UrpSpace>
  )
}

/**
 * 底部组件
 */
// const Footer = () => {
//   return (
//     <UrpGrid.Row justify="end">
//       <UrpGrid.Col span={24}>
//         <UrpSpace direction="horizontal" gap={8}>
//           <UrpButton content="取消" theme="default" size="small" />
//           <UrpButton content="确定" size="small" />
//         </UrpSpace>
//       </UrpGrid.Col>
//     </UrpGrid.Row>
//   )
// }

export default UrpSelect
