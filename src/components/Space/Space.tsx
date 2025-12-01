import { useMemo } from "react"
import { defaultProps } from "./properties.ts"
import { SpaceProps } from "./type"
import genClassNameFromProps from '../utils/tools/className.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'

import './style.less'

const UrpSpace = (props: SpaceProps) => {

  const mergedProps = { ...defaultProps, ...props }

  const spaceClassName = useMemo(() => {
    return genClassNameFromProps(
      {
        direction: mergedProps.direction,
        overflow: mergedProps.overflow
      },
      'urp-space',
      'urp-space'
    )
  }, [mergedProps.direction, mergedProps.overflow])

  const spaceStyle = useMemo(() => {
    return genStyleFromPrpos({
      'props-gap': mergedProps.gap,
      'props-align': mergedProps.align
    })
  }, [mergedProps.gap, mergedProps.align])

  return(
    <div 
      className={spaceClassName}
      style={spaceStyle}
    >
      { props.children }
    </div>
  )
}

export default UrpSpace
