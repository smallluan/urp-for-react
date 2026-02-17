import { useMemo, useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react"
import { Input } from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import { UIcon } from '../Icon/index.ts'
import './style.less'
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import InputIcons from "./components/InputIcons.tsx"
import PasswordIcon from "./components/PasswordIcon.tsx"
import InputNumberIcon from "./components/InputNumberIcon.tsx"

// const FONT_SIZE = {
//   small: 12,
//   normal: 14,
//   large: 16
// }

const UInput = forwardRef<HTMLDivElement, Input>((props, ref) => {
  const { merged: _props } = useMergedProps(
    defaultProperties,
    props,
    [
      'className', 'style', 'align', 'autoWidth', 'disabled',
      'maxlength', 'placeholder', 'readonly', 'value', 'clearable',
      'size', 'type', 'showCount', 'description', 'children',
      'shape', 'icons', 'borderless', 'defaultValue', 'theme',
      'onChange', 'onBlur', 'onFocus'
    ],
    formatProps
  )

  // value 的受控性
  const isValueControlled = _props.value !== undefined
  const [innerValue, setInnerValue] = useState(_props.defaultValue || '')
  // composingValue 初始化为 _props.value（继承初始值）
  const [composingValue, setComposingValue] = useState(_props.value || '')
  const [displayValue, setDisplayValue] = useState(_props.defaultValue || '')
  const [hidePassword, setHidePassword] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef(null)

  const finalValue = useMemo(() => {
    if (isComposing) {
      return isValueControlled ? composingValue : innerValue
    }
    return isValueControlled ? _props.value : innerValue
  }, [isComposing, isValueControlled, _props.value, innerValue, composingValue])

  const countValue = useMemo(() => {
    return isValueControlled ? _props.value : displayValue
  }, [_props.value, displayValue, isValueControlled])

  useEffect(() => {
    if (isValueControlled && !isComposing) {
      setComposingValue(_props.value || '')
    }
  }, [_props.value, isValueControlled, isComposing])

  const containerClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size,
      },
      'u-input-container', 'u-input-container', _props.className
    )
  }, [_props.shape, _props.size, _props.className])

  const inputUpClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size,
        disabled: _props.disabled,
        readonly: _props.readonly,
        borderless: _props.borderless,
        isFocused: isFocused,
        theme: _props.theme,
      },
      'u-input-up',
      'u-input-up'
    )
  }, [_props.size, _props.shape, _props.disabled, _props.readonly, isFocused, _props.borderless, _props.themeh])

  const inputClass = useMemo(() => {
    return genClassNameFromProps(
      { shape: _props.shape, size: _props.size, disabled: _props.disabled, readonly: _props.readonly, align: _props.align },
      'u-input', 'u-input', _props.className
    )
  }, [_props.size, _props.shape, _props.disabled, _props.readonly, _props.align, _props.className])

  const inputType = useMemo(() => {
    return _props.type === 'password' && !hidePassword ? 'text' : _props.type
  }, [_props.type, hidePassword])

  // const autoWidth = useMemo(() => {
  //   const validText = finalValue || _props.placeholder
  //   if (!validText) return '100px'
  //   // 计算不同尺寸下的width
  //   // 4. 创建临时 span 用于计算文本宽度（天然区分中英文/不同字符宽度）
  // const tempSpan = document.createElement('span')
  
  // // 5. 设置和实际 input 一致的样式，保证宽度计算精准
  // tempSpan.style.cssText = `
  //   position: absolute
  //   visibility: hidden
  //   font-size: ${FONT_SIZE[_props.size || 'normal']}px
  //   box-sizing: border-box
  //   height: 0
  // `

  // // 6. 赋值文本并插入到文档（必须插入才能计算 offsetWidth）
  // tempSpan.textContent = validText
  // document.body.appendChild(tempSpan)

  // // 7. 计算宽度：文本宽度 + 预留空间（避免光标被遮挡）
  // const textWidth = tempSpan.offsetWidth
  // const reserveWidth = 8 // 预留8px，可根据需求调整
  // const totalWidth = textWidth + reserveWidth

  // // 8. 移除临时元素，避免内存泄漏
  // document.body.removeChild(tempSpan)

  // // 9. 返回宽度（可加最大/最小宽度限制）
  // const minWidth = 80  // 最小宽度，避免过窄
  // const maxWidth = 500 // 最大宽度，避免过宽
  // const finalWidth = Math.max(minWidth, Math.min(maxWidth, totalWidth))

  // // 返回 px 单位的宽度值（也可返回数字，根据使用场景调整）
  // return `${finalWidth}px`

  // }, [finalValue, _props.placeholder, _props.size])

  /**
   * 重构 handleInput：区分受控/非受控 + 组合输入处理
   */
  const handleInput = useCallback((e: { target: { value: string } }) => {
    const val = e.target.value
    // 1. 组合输入阶段：只同步临时值，不触发onChange
    if (isComposing) {
      // 受控模式：更新临时 composingValue（基于原有值接续）
      if (isValueControlled) {
        setComposingValue(val)
      }
      // 非受控模式：更新innerValue（让拼音显示）
      else {
        setInnerValue(val)
      }
      return
    }

    // 2. 非组合输入阶段：正常处理
    // 受控模式：直接触发onChange（外部更新value）
    if (isValueControlled) {
      _props.onChange?.(val)
      setComposingValue(val) // 同步更新临时值，避免后续组合输入丢失
    }
    // 非受控模式：更新innerValue和displayValue
    else {
      setInnerValue(val)
      setDisplayValue(val)
      _props.onChange?.(val)
    }
  }, [isValueControlled, isComposing, _props.onChange])

  const handleClear = useCallback(() => {
    // 受控模式：触发onChange清空
    if (isValueControlled) {
      _props.onChange?.('')
      setComposingValue('')
    }
    // 非受控模式：清空内部状态
    else {
      setInnerValue('')
      setDisplayValue('')
    }
    inputRef.current?.focus()
  }, [isValueControlled, _props.onChange])

  /**
   * 组件获取/失去焦点
   */
  useEffect(() => {
    if (isFocused) {
      _props.onFocus?.(finalValue)
    } else {
      _props.onBlur?.(finalValue)
    }
  }, [isFocused, finalValue, _props.onFocus, _props.onBlur])

  /**
   * 监听 enter down,失去焦点
   */
  useEffect(() => {
    const handleEnterDown = (e: KeyboardEvent) => {
      if (!inputRef.current) return
      if (e.code === 'Enter' && document.activeElement === inputRef.current) {
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handleEnterDown)
    return () => document.removeEventListener('keydown', handleEnterDown)
  }, [])

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true)
    if (isValueControlled) {
      setComposingValue(_props.value || '')
    }
    console.log('组合输入开始')
  }, [isValueControlled, _props.value])

  const handleCompositionEnd = useCallback((e) => {
    setIsComposing(false)
    console.log('组合输入结束')
    const val = e.target.value
    if (isValueControlled) {
      _props.onChange?.(val) // 触发外部onChange更新value
      setComposingValue(val) // 同步临时值，避免后续操作丢失
    } else {
      setInnerValue(val)
      setDisplayValue(val)
      _props.onChange?.(val)
    }
  }, [isValueControlled, _props.onChange])

  /**
   * 向外暴露内部能力
   */
  useImperativeHandle(ref, () => ({
    ...containerRef.current,
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur()
  }))

  return (
    <div ref={containerRef} style={_props.style} className={containerClass}>
      <div
        className={inputUpClass}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {_props.children && <span className="u-input-children">{_props.children}</span>}
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
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          // style={{ width: autoWidth }}
        />
        <div className="u-input-icons">
          {
            (_props.clearable && (isFocused || isHover) &&
              finalValue.length > 0 && !_props.readonly && !_props.disabled) &&
            <span onClick={handleClear}>
              <UIcon className="u-close-icon" type='CloseCircleOutlined' />
            </span>
          }
          {
            _props.type === 'password' &&
            <PasswordIcon
              passwordIconVisible={hidePassword}
              onIconClick={setHidePassword}
            />
          }
          <InputIcons icons={_props.icons} />
          {
            (isHover && _props.type === 'number' && !_props.readonly && !_props.disabled) &&
            <InputNumberIcon
              value={finalValue}
              onChange={(value) => {
                handleInput({ target: { value: String(value) } })
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
              <span>{countValue.length}</span>
              {_props.maxlength > 0 && <div> /{_props.maxlength}</div>}
            </span>
          }
        </div>
      }
    </div>
  )
})

UInput.displayName = 'UInput'
export default UInput
