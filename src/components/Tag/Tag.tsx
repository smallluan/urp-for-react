import { Tag } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"

import "./style.less"

const UTag = (props: Tag) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'children', 'content',
      'closeable', 'theme', 'shape', 'size',
      'prefixIcon', 'suffixIcon', 'title', 'onClick',
      'onClose'
    ]
  )

  console.log(_props)

  return (
    <div>UTag</div>
  )
}

export default UTag
