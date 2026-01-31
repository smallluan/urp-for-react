import { useMemo, useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react"
import { Input } from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import { UIcon } from '../Icon/index.ts'
import './style.less'
import debounce from 'lodash/debounce'
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import InputIcons from "./components/InputIcons.tsx"
import PasswordIcon from "./components/PasswordIcon.tsx"
import InputNumberIcon from "./components/InputNumberIcon.tsx"

const UInput = forwardRef<HTMLDivElement, Input>((props, ref) => {

  const { merged: _props } = useMergedProps(
    defaultProperties,
    props,
    [
      'className', 'style', 'align', 'autoWidth', 'disabled',
      'maxlength', 'placeholder', 'readonly', 'value', 'clearable',
      'size', 'type', 'showCount', 'description', 'children',
      'shape', 'icons', 'borderless', 'onChange', 'defaultValue',
      'onBlur', 'onFocus'
    ],
    formatProps
  )

  // value 的受控性
  const isValueControlled = _props.value !== undefined
  const [innerValue, setInnerValue] = useState(_props.defaultValue || '')
  const finalValue = useMemo(() => (
    isValueControlled ? _props.value : innerValue
  ), [_props.value, _props.defaultValue, innerValue, isValueControlled])

  const [hidePassword, setHidePassword] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef(null)

  // 外层容器 class
  const containerClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size,
        autoWidth: _props.autoWidth
      },
      'u-input-container',
      'u-input-container',
      _props.className
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
  

  /**
   * 防抖处理后的onChange
   */
  const debouncedOnchange = useCallback(
    debounce((val: string) => {
      _props.onChange?.(val)
    }, 200, { leading: true }), 
    [_props.onChange]
  )
  

  /**
   * 值变化事件
   */
  const handleInput = useCallback((
    e: { target: { value: string } }
  ) => {
    if (!isValueControlled) {
      setInnerValue(e.target.value)
    }
    debouncedOnchange(e.target.value)
  }, [_props.onChange])


  /**
   * 清空输入框内容
   */
  const handleClear = useCallback(() => {
    if (!isValueControlled) {
      setInnerValue('')
    }
    debouncedOnchange('')
    inputRef.current?.focus()
  }, [isValueControlled])


  /**
   * 组件获取/失去焦点
   */
  useEffect(() => {
    if (isFocused) {
      _props.onFocus?.(finalValue)
    } else {
      _props.onBlur?.(finalValue)
    }
  }, [isFocused])

  
  /**
   * 监听 enter down,失去焦点
   */
  useEffect(() => {
    const handleEnterDown = (e: KeyboardEvent) => {
      if (!inputRef.current) return
      // 仅在按下 enter 并且页面焦点在当前元素上时才触发失去焦点
      if (e.code === 'Enter' && document.activeElement === inputRef.current) {
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handleEnterDown)

    return () => {
      document.removeEventListener('keydown', handleEnterDown)
    }
  }, [])


  /**
   * 向外暴露内部能力
   */
  useImperativeHandle(ref, () => ({
    ...containerRef.current,
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur()
  }))

  return(
    <div
      ref={containerRef}
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
          maxLength={_props.maxlength}
          value={finalValue}
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
              finalValue.length > 0 &&
              !_props.readonly && !_props.disabled
            ) &&
            <span onClick={handleClear}>
              <UIcon className="u-close-icon" type='CloseCircleOutlined'/>
            </span>
          }
          {
            _props.type === 'password' &&
            <PasswordIcon
              passwordIconVisible={hidePassword}
              onIconClick={setHidePassword}
            />
          }
          {/* 自定义图标 */}
          <InputIcons icons={_props.icons} />
          {/* 数字类型输入框增减图标 */}
          {
            (
              isHover &&
              _props.type === 'number' &&
              !_props.readonly && !_props.disabled
            ) &&
            <InputNumberIcon
              value={finalValue}
              onChange={(value) => {
                handleInput({target: { value: String(value) }})
              }}
            />
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
              <span>{ finalValue.length }</span>
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
})

UInput.displayName = 'UInput'

export default UInput
