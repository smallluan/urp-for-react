import { LinkType } from "./type.ts"
import { defaultProperties } from "./properties.ts"
import { UIcon } from '../Icon/index.ts'
import { useMemo } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"
import { Link } from "react-router-dom"
import './style.less'
import useMergedProps from "../utils/hooks/useMergedProps.ts"

export default function ULink(props: LinkType) {
  const { merged: _props } = useMergedProps (
    defaultProperties,
    props,
    [
      'className', 'style', 'content', 'children',
      'theme', 'underline', 'size', 'disabled',
      'prefixIcon', 'suffixIcon', 'href', 'target',
      'to', 'onClick'
    ]
  )
  const { 
    content, children, href, target, theme, 
    size, disabled, underline, prefixIcon, suffixIcon, to,
    className, style, onClick
  } = _props
  const linkContent = content ?? children

  const linkClass = useMemo(() => 
    genClassNameFromProps(
      { theme, size, disabled, underline },
      'u-link',
      'u-link',
      className
    )
  , [theme, size, disabled, underline, className])

  const renderLink = () => {
    if (disabled) {
      return (
        <div style={{ pointerEvents: 'none' }}>
          {prefixIcon && <UIcon type={prefixIcon} />}
          <span>{linkContent}</span>
          {suffixIcon && <UIcon type={suffixIcon} />}
        </div>
      )
    }
    if (to) {
      return (
        <Link to={to} target={target}>
          {prefixIcon && <UIcon type={prefixIcon} />}
          <span>{linkContent}</span>
          {suffixIcon && <UIcon type={suffixIcon} />}
        </Link>
      )
    }
    return (
      <a href={href} target={target}>
        {prefixIcon && <UIcon type={prefixIcon} />}
        <span>{linkContent}</span>
        {suffixIcon && <UIcon type={suffixIcon} />}
      </a>
    )
  }

  return (
    <div 
      aria-disabled={disabled}
      data-testid='u-link'
      className={linkClass}
      style={{...style}}
      onClick={onClick}
    >
      {renderLink()}
      {underline !== 'none' && !disabled && (
        <span aria-hidden="true" className="underline"></span>
      )}
    </div>
  )
}