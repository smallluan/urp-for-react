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

import "./style.less"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

const SelectContext = createContext<Context | undefined>(undefined)

const UrpSelect = (props: Select) => {

  const _props = { ...selectDefaultProps, ...props }

  // state —— 鼠标进入组件
  const [mouseEnter, setMouseEnter] = useState(false)
  // state —— 组件聚焦
  const [mouseFocus, setMouseFocus] = useState(false)
  // ref —— 记录是否已经监听 window click 事件
  const hasBindClickRef = useRef(false)
  // ref —— Select 组件自身，用于判断鼠标点击时的点击位置，从而设置聚焦状态
  const selectRef = useRef(null)
  // ref —— Inputable 属性相关，当 Select 可输入时的输入框 
  const inputRef = useRef(null)

  useEffect(() => {
    // 防止重复注册监听函数
    if (hasBindClickRef.current) return
    hasBindClickRef.current = true
    // 页面鼠标点击事件处理
    // 点击到组件以外的元素取消聚焦状态
    const handleWindowClick = (e) => {
      if (
        selectRef.current && 
        !selectRef.current.contains(e.target)
      ) {
        setMouseFocus(false)
      }
    }
    window.addEventListener('click', handleWindowClick)
    return () => {
      // 组件销毁时移除时间监听，防止内存泄露
      window.removeEventListener('click', handleWindowClick)
      hasBindClickRef.current = false
    }
  }, [])

  // memo —— Select 类
  const selectClass = useMemo(() => {
    return genClassNameFromProps(
      {
        hover: mouseEnter,
        focus: mouseFocus,
        borderless: _props.borderless
      },
      'urp-select',
      'urp-select'
    )
  }, [mouseFocus, mouseEnter, _props.borderless])

  // memo —— 输入框显示条件
  const showInput = useMemo(() => {
    // 当属性为可输入，且组件被聚焦时显示输入框
    return _props.inputable && mouseFocus
  }, [_props.inputable, mouseFocus])

  // memo —— 单选值容器的显示条件
  const showSingleSelected = useMemo(() => {
    return(
      !_props.multiple && 
      !(_props.inputable && mouseFocus)
    )
  }, [_props.multiple, _props.inputable, mouseFocus])

  // memo —— 多选值容器的显示条件
  const showMutipleSelected = useMemo(() => {
    return(
      _props.multiple &&
      !(_props.inputable && mouseFocus)
    )
  }, [_props.multiple, _props.inputable, mouseFocus])

  const setFoucsState = useCallback(() => {
    setMouseFocus(!mouseFocus)
  }, [mouseFocus])

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
    mouseFocus: mouseFocus,
    mouseEnter: mouseEnter,
    clearable: _props.clearable,
    hideRadioCircle: _props.hideRadioCircle,
    hideSelected: _props.hideSelected,
    onChange: _props.onChange,
    onClearValue: handleClearValue,
    setMouseFocus: setMouseFocus,
  }), [_props.options, _props.defaultValue, _props.value, _props.onChange, _props.clearable, mouseFocus, handleClearValue])

  return(
    <SelectContext.Provider value={contextValue}>
      <div
        ref={selectRef}
      >
        <UrpPopup
          trigger="click"
          position={props.position}
        >
          <div
            className={selectClass}
            tabIndex={0}
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            onClick={setFoucsState}
          >
            {/* 单选选中项容器 */}
            {
              showSingleSelected &&
              <div className="urp-select-selected">
              {
                _props.options.find(item => item.value === _props.value)?.label || ''
              }
            </div>
            }
            {/* 多选选中项容器 */}
            {
              showMutipleSelected &&
              <div>

              </div>
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
                  console.log(targetOption)
                  if (targetOption === undefined) {
                    _props.onChange('')
                  } else {
                    _props.onChange(targetOption.value)
                  }
                  
                }}
                className="urp-select-input"
                type="text"
              />
            }
            <Icons/>
          </div>
          <UrpPopup.Content
            position={_props.position}
            visible={mouseFocus}
            className="urp-select-pop-content"
            arrow
          >
            <div style={{ width: '100%' }}>
              <UrpSpace direction="vertial" gap={8}>
                <Options/>
                {/* <Footer/>  */}
              </UrpSpace>
            </div>
          </UrpPopup.Content>
        </UrpPopup>
      </div>
    </SelectContext.Provider>
  )
}

/**
 * 选项组件
 */
const Options = () => {
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
    <UrpCheckBox.Group
      onChange={(newValue: Context['value']) => {
        if (!context.multiple) {
          context.setMouseFocus(false)
        }
        context.onChange?.(newValue)
      }}
      defaultValue={context.defaultValue}
      multiple={context.multiple}
      value={context.value}
      style={{width: '100%'}}
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
          <div className={classNames("check-box-label", {"check-box-label-checked": item.value === context.value})}>{item.label}</div>
          </UrpCheckBox.Item>
        ))
      }
      </UrpSpace>
    </UrpCheckBox.Group>
  )
}

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
        down: !context.mouseFocus,
        up: context.mouseFocus,
      },
      'urp-select-icon-arrow',
      'urp-select-icon-arrow'
    )
  }, [context.mouseFocus])
  return(
    <UrpSpace
      className="urp-select-icons"
      gap={4}
    >
      {
        (
          context.clearable && 
          (context.mouseEnter || context.mouseFocus) &&
          context.value !== ''  // checkbox 好像单选的时候什么都没选中返回的是空字符
        ) ?
        <UrpIcon
          onClick={context.onClearValue}
          className={arrowIconClass}
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
