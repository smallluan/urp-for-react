import { useMemo, useState } from "react"
import InputType from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import './style.less'

export default function UrpInput(props: InputType) {
  const mergedProps = formatProps({ ...defaultProperties, ...props })
  const { size, shape, disabled, readonly, maxlength, type, placeholder } = mergedProps
  const [value, setValue] = useState(mergedProps.value)
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
        size: size
      },
      'urp-input',
      'urp-input'
    )
  }, [size])

  const onInput = (e: { currentTarget: HTMLInputElement }) => {
    setValue(e.currentTarget.value)
  }

  return(
    <div className={containerClass}>
      <input
        maxLength={maxlength}
        value={value}
        className={inputClass}
        type={type}
        placeholder={placeholder}
        onInput={onInput}
      />
    </div>
  )
}
