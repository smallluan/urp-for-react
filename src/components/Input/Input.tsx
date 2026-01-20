import { useEffect, useMemo, useRef, useState, Dispatch, SetStateAction, useCallback } from "react"
import InputType from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import { UIcon } from '../Icon/index.ts'
import './style.less'
import debounce from 'lodash/debounce'
import useMergedProps from "../utils/hooks/useMergedProps.ts"

export default function UInput(props: InputType) {

  const { merged: _props } = useMergedProps(
    defaultProperties,
    props,
    [
      'className', 'style', 'align', 'autoWidth', 'disabled',
      'maxlength', 'placeholder', 'readonly', 'value', 'clearable',
      'size', 'type', 'showCount', 'description', 'children',
      'shape', 'icons', 'borderless', 'onChange' 
    ],
    formatProps
  )

  const [value, setValue] = useState(_props.value)
  const [hidePassword, setHidePassword] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(_props.value)
  }, [_props.value])

  useEffect(() => {
    debouncedOnchange(value)
  }, [value])


  // 外层容器 class
  const containerClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size,
        autoWidth: _props.autoWidth
      },
      'u-input-container'  + _props.className ? ' ' + _props.className : '',
      'u-input-container'
    )
  }, [_props.shape, _props.size, _props.autoWidth, _props.className])


  // 输入框上层容器 class
  const inputUpClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size,
        disabled: _props.disabled,
        readonly: _props.readonly,
        borderless: _props.borderless,
        isFocused: isFocused,
      },
      'u-input-up','u-input-up')
  }, [_props.size, _props.shape, _props.disabled, _props.readonly, isFocused, _props.borderless])


  // 输入框本体 class
  const inputClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size,
        disabled: _props.disabled,
        readonly: _props.readonly,
        align: _props.align
      },
      'u-input','u-input')
  }, [_props.size, _props.shape, _props.disabled, _props.readonly])


  // 输入框类型（针对 password 类型）
  const inputType = useMemo(() => {
    if (_props.type === 'password' && !hidePassword) {
      return 'text'
    }
    return _props.type
  }, [_props.type, hidePassword])
  

  const debouncedOnchange = useCallback(
    debounce((val: string) => {
      _props.onChange?.(val)
    }, 200, { leading: true }), 
    [_props.onChange]
  )
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  return(
    <div 
      style={_props.style}
      className={containerClass}>
      <div
        className={inputUpClass}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {
          _props.children &&
          <span className="u-input-children">{_props.children}</span>
        }
        <input
          ref={inputRef}
          disabled={_props.disabled || _props.readonly}
          maxLength={props.maxlength}
          value={_props.value}
          className={inputClass}
          type={inputType}
          placeholder={_props.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInput}
        />
        <div className="u-input-icons">
          {
            /* 注意一下这里的图标顺序，clearable 的图标最好排在最前面，
            因为它可能频繁的显示隐藏出现bug */
          }
          {
            ( _props.clearable && (isFocused || isHover) &&
              value.length > 0 &&
              !_props.readonly && !_props.disabled
            ) &&
            <span
              onClick={handleClear}
            >
              <UIcon className="u-close-icon" type='CloseCircleOutlined' />
            </span>
          }
          {
            _props.type === 'password' &&
            <span>
              {
                hidePassword ?
                  <UIcon
                    onClick={() => {
                      setHidePassword(false)
                    }}
                    className="u-close-icon"
                    type='EyeInvisibleOutlined'
                  /> :
                  <UIcon
                    onClick={() => setHidePassword(true)}
                    className="u-close-icon"
                    type='EyeOutlined'
                  />
              }
            </span>
          }
          {/* 自定义组件 */}
          { genCustomIcons(_props.icons) }
          {/* 数字类型输入框增减图标 */}
          {
            (
              isHover &&
              _props.type === 'number' &&
              !_props.readonly && !_props.disabled
            ) &&
            genNumberIcons(setValue)
          }
        </div>
      </div>
      {
        (_props.description || _props.showCount) &&
        <div className="u-input-down">
          <div>{_props.description}</div>
          {
            _props.showCount &&
            <span className="u-count">
              <span>{ value.length }</span>
              {
                _props.maxlength > 0 &&
                <div> /{_props.maxlength}</div>
              }
            </span>
          }
        </div>
      }  
    </div>
  )
}

/**
 * 数字类型输入框显示的增减图标生成函数
 * @param setValue - 设置输入框值的函数
 * @returns 
 */
const genNumberIcons = (setValue: Dispatch<SetStateAction<string>>) => {
  return (
    <span className="u-number-icons">
      <UIcon
        onClick={() => setValue((prev: string) => {
          const newValue = Number(prev) + 1
          return String(newValue)
        })}
        className="u-number-icon-up"
        type='CaretUpOutlined'
      />
      <UIcon
        onClick={() => setValue((prev: string) => {
          const newValue = Number(prev) - 1
          return String(newValue)
        })}
        className="u-number-icon-down"
        type='CaretDownOutlined'
      />
    </span>
  )
}

/**
 * 用户自定义图标生成函数
 * @param icons - 用户传入的 icons
 */
const genCustomIcons = (icons: InputType['icons']) => {
  if (typeof icons === 'string') {
    return (
      <UIcon
        className="u-close-icon"
        type={icons}
      />
    )
  }
  if (Array.isArray(icons)) {
    return(
      icons.map((icon, index) => {
        if (typeof icon === 'string') {
          return (
            <UIcon
              key={index}
              className="u-close-icon"
              type={icon}
            />
          )
        } else {
          return (
            <span className="u-close-icon" key={index}>
              {icon}
            </span>
          )
        }
      })
    )
  }
  return (
    <span className="u-close-icon">
      {icons}
    </span>
  )
}
