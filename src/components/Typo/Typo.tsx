import { useMemo } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"

import "./style.less"

/**
 * 标题
 */
const Title = (props) => {
  const { level = 1, children, ...restProps } = props
  const validLevel = Math.max(1, Math.min(6, Number(level)))
  const HeadingTag = `h${validLevel}`

  return <HeadingTag {...restProps}>{children}</HeadingTag>
}

/**
 * 文字
 */
const Text = (props) => {
  const textClass = useMemo(() => {
    return genClassNameFromProps(
      {
        mark: props.mark
      },
      'urp-typo-text',
      'urp-typo-text'
    )
  }, [props.mark])
  return(
    <span className={textClass}>{props.children}</span>
  )
}

/**
 * 描述
 */
const Description = (props) => {
  const { children } = props
  return(
    <div className="urp-typo-Description">{children}</div>
  )
}

const Typo = {
  Title,
  Text,
  Description
}
export default Typo
