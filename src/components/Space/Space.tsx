import { useMemo } from "react"
import { defaultProps } from "./properties.ts"
import { SpaceProps } from "./type"
import genClassNameFromProps from '../utils/tools/className.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'
import { useMergedProps } from "../utils/tools/props.ts"
import { formatProps } from './properties.ts'

import { SpaceGap } from './type'

import './style.less'

const UrpSpace = (props: SpaceProps) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    ['direction', 'overflow', 'gap', 'align', 'scrollBar'],
    formatProps
  )

  const spaceClassName = useMemo(() => {
    return genClassNameFromProps(
      {
        direction: _props.direction,
        overflow: _props.overflow,
        scrollBar: _props.scrollBar
      },
      'u-space',
      'u-space'
    )
  }, [_props.direction, _props.overflow])

  const spaceStyle = useMemo(() => {
    let horizontalGap: SpaceGap
    let vertialGap: SpaceGap

    if (Array.isArray(_props.gap)) {
      horizontalGap = _props.gap[0]
      vertialGap = _props.gap[1]
    } else {
      horizontalGap = _props.gap
      vertialGap = _props.gap
    }
    
    return genStyleFromPrpos({
      'props-gap-vertial': vertialGap,
      'props-gap-horizontal': horizontalGap,
      'props-align': _props.align
    })
  }, [_props.gap, _props.align])

  return(
    <div 
      className={spaceClassName + ' ' + props.className}
      style={{...spaceStyle, ...props.style}}
    >
      { props.children }
    </div>
  )
}

export default UrpSpace
