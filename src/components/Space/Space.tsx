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

  const { merged: mergedProps } = useMergedProps(
    defaultProps,
    props,
    ['direction', 'overflow', 'gap', 'align', 'scrollBar'],
    formatProps
  )

  const spaceClassName = useMemo(() => {
    return genClassNameFromProps(
      {
        direction: mergedProps.direction,
        overflow: mergedProps.overflow,
        scrollBar: mergedProps.scrollBar
      },
      'urp-space',
      'urp-space'
    )
  }, [mergedProps.direction, mergedProps.overflow])

  const spaceStyle = useMemo(() => {
    let horizontalGap: SpaceGap
    let vertialGap: SpaceGap

    if (Array.isArray(mergedProps.gap)) {
      horizontalGap = mergedProps.gap[0]
      vertialGap = mergedProps.gap[1]
    } else {
      horizontalGap = mergedProps.gap
      vertialGap = mergedProps.gap
    }
    
    return genStyleFromPrpos({
      'props-gap-vertial': vertialGap,
      'props-gap-horizontal': horizontalGap,
      'props-align': mergedProps.align
    })
  }, [mergedProps.gap, mergedProps.align])

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
