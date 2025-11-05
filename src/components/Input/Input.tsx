import { useMemo, useState } from "react"
import InputType from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import { UrpIcon } from '../Icon/index.ts'
import './style.less'

export default function UrpInput(props: InputType) {
  const mergedProps = formatProps({ ...defaultProperties, ...props })
  const { size, shape, disabled, readonly, maxlength, 
    type, placeholder, clearable, showCount, description 
  } = mergedProps
  const [value, setValue] = useState(mergedProps.value)
  const [isFocused, setIsFocused] = useState(false)
  const [isMouseEnter, setIsMouseEnter] = useState(false)
  const [isClearIconHover, setIsClearIconHover] = useState(false)
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

  const onInput = (e: { currentTarget: HTMLInputElement }) => {
    setValue(e.currentTarget.value)
  }

  return(
    <div className={containerClass}>
      <div className="urp-input-up">
        <input
          disabled={disabled}
          maxLength={maxlength}
          value={value}
          className={inputClass}
          type={type}
          placeholder={placeholder}
          onInput={onInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsMouseEnter(true)}
          onMouseLeave={() => setIsMouseEnter(false)}
        />
        {
          (clearable && (isFocused || isMouseEnter || isClearIconHover) && value.length > 0) &&
          <span 
            onMouseEnter={() => setIsClearIconHover(true)}
            onMouseLeave={() => setIsClearIconHover(false)}
            onClick={() => setValue('')}
          >
            <UrpIcon className="urp-close-icon" type='CloseCircleOutlined' />
          </span>
        }
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
