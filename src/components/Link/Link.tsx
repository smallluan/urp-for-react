import { LinkType } from "./type.ts"
import defaultProperties from "./properties.ts"
import { UrpIcon } from '../Icon/index.ts'
import { useMemo } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"
import { Link } from "react-router-dom"
import './style.less'

export default function UrpLink(props: LinkType) {
  const mergedProps = { ...defaultProperties, ...props }
  const { 
    content, children, href, target, theme, 
    size, disabled, underline, prefixIcon, suffixIcon, to 
  } = mergedProps
  const linkContent = content ?? children

  const linkClass = useMemo(() => 
    genClassNameFromProps(
      { theme, size, disabled, underline },
      'u-link',
      'u-link'
    )
  , [theme, size, disabled, underline])

  const renderLink = () => {
    if (disabled) {
      return (
        <div style={{ pointerEvents: 'none' }}>
          {prefixIcon && <UrpIcon type={prefixIcon} />}
          <span>{linkContent}</span>
          {suffixIcon && <UrpIcon type={suffixIcon} />}
        </div>
      )
    }
    if (to) {
      return (
        <Link to={to} target={target}>
          {prefixIcon && <UrpIcon type={prefixIcon} />}
          <span>{linkContent}</span>
          {suffixIcon && <UrpIcon type={suffixIcon} />}
        </Link>
      )
    }
    return (
      <a href={href} target={target}>
        {prefixIcon && <UrpIcon type={prefixIcon} />}
        <span>{linkContent}</span>
        {suffixIcon && <UrpIcon type={suffixIcon} />}
      </a>
    )
  }

  return (
    <div 
      aria-disabled={disabled}
      data-testid='u-link'
      className={linkClass}
    >
      {renderLink()}
      {underline !== 'none' && !disabled && (
        <span aria-hidden="true" className="underline"></span>
      )}
    </div>
  )
}