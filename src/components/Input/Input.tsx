import { useEffect, useMemo, useRef, useState, Dispatch, SetStateAction, useCallback } from "react"
import InputType from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import { UIcon } from '../Icon/index.ts'
import './style.less'
import debounce from 'lodash/debounce'

export default function UInput(props: InputType) {
  const _props = useMemo(() => {
    return formatProps({ ...defaultProperties, ...props })
  }, [props])
  const { size, shape, disabled, readonly, maxlength, 
    type, placeholder, clearable, showCount, description,
    children, icons, borderless, onChange, autoWidth
  } = _props
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
      { shape, size, autoWidth },
      'u-input-container', 
      'u-input-container'
    )
  }, [shape, size, autoWidth])
  // 输入框上层容器 class
  const inputUpClass = useMemo(() => {
    return genClassNameFromProps(
      { shape, size, disabled, readonly, isFocused, borderless },
      'u-input-up','u-input-up')
  }, [size, shape, disabled, readonly, isFocused, borderless])
  // 输入框本体 class
  const inputClass = useMemo(() => {
    return genClassNameFromProps(
      { shape, size, disabled, readonly},
      'u-input','u-input')
  }, [size, shape, disabled, readonly])
  // 输入框类型（针对 password 类型）
  const inputType = useMemo(() => {
    if (type === 'password' && !hidePassword) {
      return 'text'
    }
    return type
  }, [type, hidePassword])

  const debouncedOnchange = useCallback(
    debounce((val: string) => {
      onChange?.(val)
    }, 200, { leading: true }), 
    [onChange]
  )
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  return(
    <div className={containerClass}>
      <div
        className={inputUpClass}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {
          children &&
          <span className="u-input-children">{children}</span>
        }
        <input
          ref={inputRef}
          disabled={disabled || readonly}
          maxLength={maxlength}
          value={value}
          className={inputClass}
          type={inputType}
          placeholder={placeholder}
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
            ( clearable && (isFocused || isHover) &&
              value.length > 0 &&
              !readonly && !disabled
            ) &&
            <span
              onClick={handleClear}
            >
              <UIcon className="u-close-icon" type='CloseCircleOutlined' />
            </span>
          }
          {
            type === 'password' &&
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
          { genCustomIcons(icons) }
          {/* 数字类型输入框增减图标 */}
          {
            (
              isHover &&
              type === 'number' &&
              !readonly && !disabled
            ) &&
            genNumberIcons(setValue)
          }
        </div>
      </div>
      {
        (description || showCount) &&
        <div className="u-input-down">
          <div>{ description }</div>
          {
            showCount &&
            <span className="u-count">
              <span>{ value.length }</span>
              {
                maxlength > 0 &&
                <div> /{ maxlength }</div>
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
