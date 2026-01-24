import { Rate } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import "./style.less"

const URate = (props: Rate) => {
  // 合并属性
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'value', 'defaultValue',
      'count', 'disabled', 'allowPartial', 'clearable',
      'color', 'texts', 'gap', 'size', 'onChange'
    ]
  )

  console.log(_props)
  return ( 
    <div>111</div>
  )
}



export default URate
