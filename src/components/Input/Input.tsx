import { useMemo, useRef, useState } from "react"
import InputType from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import { UrpIcon } from '../Icon/index.ts'
import './style.less'

export default function UrpInput(props: InputType) {
  const mergedProps = formatProps({ ...defaultProperties, ...props })
  const { size, shape, disabled, readonly, maxlength, 
    type, placeholder, clearable, showCount, description,
    children 
  } = mergedProps
  const [value, setValue] = useState(mergedProps.value)
  const [hidePassword, setHidePassword] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isClearIconHover, setIsClearIconHover] = useState(false)
  // const isComposingRef = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  // 外层容器 class
  const containerClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: shape,
        size: size,
        disabled: disabled,
        readonly: readonly
      },
      'urp-input-container',
      'urp-input-container'
    )
  }, [shape, size, disabled, readonly])
  // 输入框本体 class
  const inputClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: shape,
        size: size
      },
      'urp-input',
      'urp-input'
    )
  }, [size, shape])
  // 输入框类型（针对 password 类型）
  const inputType = useMemo(() => {
    if (type === 'password' && !hidePassword) {
      return 'text'
    }
    return type
  }, [type, hidePassword])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (!isComposingRef.current) {
    //   setValue(e.target.value)
    // }
    setValue(e.target.value)
  }

  // const handleCompositionStart = (e) => {
  //   handleInput(e)
  //   console.log('组合输入开始')
  //   isComposingRef.current = true 
  // }

  // const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    
  //   isComposingRef.current = false
  //   // 组合结束后，使用最终的值更新状态
  //   const finalValue = e.currentTarget.value
  //   setValue(finalValue)
  //   console.log('组合输入结束')
  // }


  const handleClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  return(
    <div className={containerClass}>
      <div className="urp-input-up">
        {
          children &&
          <span className="urp-input-children">{children}</span>
        }
        <input
          ref={inputRef}
          disabled={disabled}
          maxLength={maxlength}
          value={value}
          className={inputClass}
          type={inputType}
          placeholder={placeholder}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // onCompositionStart={handleCompositionStart}
          // onCompositionEnd={handleCompositionEnd}
        />
        <div className="urp-input-icons">
          {
            /* 注意一下这里的图标顺序，clearable 的图标最好排在最前面，
            因为它可能频繁的显示隐藏出现bug */
          }
          {
            (clearable && (isFocused || isClearIconHover) &&
              value.length > 0) &&
            <span
              onMouseEnter={() => setIsClearIconHover(true)}
              onMouseLeave={() => setIsClearIconHover(false)}
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
