import { useMemo } from "react"
import InputType from "./type"
import defaultProperties, { formatProps } from './properties.ts'
import genClassNameFromProps from '../utils/tools/className.ts'
import './style.less'

export default function UrpInput(props: InputType) {
  const mergedProps = formatProps({ ...defaultProperties, ...props })
  const { size, shape } = mergedProps
  // 外层容器 class
  const containerClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: shape,
        size: size
      },
      'urp-input-container',
      'urp-input-container'
    )
  }, [shape, size])
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

  return(
    <div className={containerClass}>
      <input className={inputClass} type="text" />
    </div>
  )
}
