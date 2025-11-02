import { LinkType } from "./type.ts"
import defaultProperties from "./properties.ts"
import { UrpIcon } from '../Icon/index.ts'
import { useMemo } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"

import './style.less'

export default function UrpLink(props: LinkType) {

  const mergedProps = { ...defaultProperties, ...props }
  const { 
    content, children, href, target, theme, 
    size, disabled, underline, prefixIcon, suffixIcon 
  } = mergedProps
  const linkContent = content ?? children

  const linkClass = useMemo(() => {
    return genClassNameFromProps(
      {
        theme: theme,
        size: size,
        disabled: disabled,
        underline: underline
      },
      'urp-link',
      'urp-link'
    )
  }, [theme, size, disabled, underline])

  return(
    <div className={linkClass}>
      <div>
        {
          prefixIcon &&
          <UrpIcon type={prefixIcon} />
        }
        <a href={href} target={target}>{linkContent}</a>
         {
          suffixIcon &&
          <UrpIcon type={suffixIcon} />
        }
      </div>
      {
        underline !== 'none' &&
        <span className="underline"></span>
      }
    </div>
  )
}
