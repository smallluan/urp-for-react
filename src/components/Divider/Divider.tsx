import type { DividerProps } from './type'
import genClassNameFromProps from '../utils/tools/className.ts'
import './style.less'

export default function Divider({ children, ...props }: DividerProps) {

  const className = genClassNameFromProps<DividerProps>(props, 'urp-divider')

  if (typeof children === 'string') {
    return (
      <div className="">
        <span>{children}</span>
      </div>
    )
  } else if (Array.isArray(children)) {
    return (
      <div className="">
        {children}
      </div>
    )
  }

  return (
    <div className={className}></div>
  )
}
