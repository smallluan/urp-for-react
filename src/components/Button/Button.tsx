import { ButtonType } from "./type"
import defaultProperties from "./propertiers.ts"

export default function UrpButton(props: ButtonType) {
  const mergedProps = { ...defaultProperties, ...props }
  // 优先显示已属性形式传进来的内容
  mergedProps.content = mergedProps.content ?? mergedProps.children
  return (
    <div>{ mergedProps.content }</div>
  )
}
