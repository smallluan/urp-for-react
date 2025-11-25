import { useEffect, useMemo, useRef, useState } from "react"
import InputType from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import { UrpIcon } from '../Icon/index.ts'
import './style.less'

export default function UrpInput(props: InputType) {
  const mergedProps = useMemo(() => {
    return formatProps({ ...defaultProperties, ...props })
  }, [props])
  const { size, shape, disabled, readonly, maxlength, 
    type, placeholder, clearable, showCount, description,
    children, icons
  } = mergedProps
  const [value, setValue] = useState(mergedProps.value)
  const [hidePassword, setHidePassword] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isClearIconHover, setIsClearIconHover] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setValue(mergedProps.value)
  }, [mergedProps.value])
  // 外层容器 class
  const containerClass = useMemo(() => {
    return genClassNameFromProps(
      { shape, size},
      'urp-input-container', 'urp-input-container'
    )
  }, [shape, size])
  // 输入框上层容器 class
  const inputUpClass = useMemo(() => {
    return genClassNameFromProps(
      { shape, size, disabled, readonly, isFocused},
      'urp-input-up','urp-input-up')
  }, [size, shape, disabled, readonly, isFocused])
  // 输入框本体 class
  const inputClass = useMemo(() => {
    return genClassNameFromProps(
      { shape, size, disabled, readonly},
      'urp-input','urp-input')
  }, [size, shape, disabled, readonly])
  // 输入框类型（针对 password 类型）
  const inputType = useMemo(() => {
    if (type === 'password' && !hidePassword) {
      return 'text'
    }
    return type
  }, [type, hidePassword])
  
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
        onMouseEnter={() => setIsClearIconHover(true)}
        onMouseLeave={() => setIsClearIconHover(false)}
      >
        {
          children &&
          <span className="urp-input-children">{children}</span>
        }
        <input
          ref={inputRef}
          disabled={disabled || readonly}
          maxLength={maxlength}
          value={value}
          className={inputClass}
          type={inputType}
          placeholder={placeholder}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="urp-input-icons">
          {
            /* 注意一下这里的图标顺序，clearable 的图标最好排在最前面，
            因为它可能频繁的显示隐藏出现bug */
          }
          {
            ( clearable && (isFocused || isClearIconHover) &&
              value.length > 0 &&
              !readonly && !disabled
            ) &&
            <span
              onClick={handleClear}
            >
              <UrpIcon className="urp-close-icon" type='CloseCircleOutlined' />
            </span>
          }
          {
            type === 'password' &&
            <span>
              {
                hidePassword ?
                  <UrpIcon
                    onClick={() => {
                      setHidePassword(false)
                    }}
                    className="urp-close-icon"
                    type='EyeOutlined'
                  /> :
                  <UrpIcon
                    onClick={() => setHidePassword(true)}
                    className="urp-close-icon"
                    type='EyeInvisibleOutlined'
                  />
              }
            </span>
          }
          {/* 自定义组件 */}
          { genCustomIcons(icons) }
        </div>
      </div>
      <div className="urp-input-down">
        <div>{ description }</div>
        {
          showCount &&
          <span className="urp-count">
            <span>{ value.length }</span>
            {
              maxlength > 0 &&
              <div> /{ maxlength }</div>
            }
          </span>
        }
      </div>
    </div>
  )
}

const genCustomIcons = (icons: InputType['icons']) => {
  if (typeof icons === 'string') {
    return (
      <UrpIcon
        className="urp-close-icon"
        type={icons}
      />
    )
  }
  if (Array.isArray(icons)) {
    return(
      icons.map((icon, index) => {
        if (typeof icon === 'string') {
          return (
            <UrpIcon
              key={index}
              className="urp-close-icon"
              type={icon}
            />
          )
        } else {
          return (
            <span className="urp-close-icon" key={index}>
              {icon}
            </span>
          )
        }
      })
    )
  }
  return (
    <span className="urp-close-icon">
      {icons}
    </span>
  )
}
