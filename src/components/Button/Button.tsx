import { ButtonType } from "./type"
import defaultProperties from "./propertiers.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import './style.less'

export default function UrpButton(props: ButtonType) {
  const mergedProps = { ...defaultProperties, ...props }
  const buttonClass = genClassNameFromProps(
    {
      variant: mergedProps.variant,
      theme: mergedProps.theme,
      shape: mergedProps.shape,
      size: mergedProps.size,
      block: mergedProps.block,
      disabled: mergedProps.disabled
    },
    'urp-button',
    'urp-button'
  )
  // 优先显示已属性形式传进来的内容
  mergedProps.content = mergedProps.content ?? mergedProps.children
  return (
    <div className={buttonClass}>
      <span>{ mergedProps.content }</span>
    </div>
  )
}
