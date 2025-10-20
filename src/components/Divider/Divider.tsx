import type { DividerProps } from './type'
import genClassNameFromProps from '../utils/tools/className.ts'
import defaultProperties, { lineDefaultProps } from './properties.ts'
import './style.less'

export default function Divider({ children, ...props }: DividerProps) {
  // 合并默认属性和传入属性
  props = { ...defaultProperties, ...props }

  if (typeof children === 'string') {
    return (
      <div className="urp-divider">
        <Line/>
        <ChildrenItem>{ children }</ChildrenItem>
        <Line/>
      </div>
    )
  } else if (Array.isArray(children)) {
    return (
      <div className='urp-divider-with-children'>
       {
        children.map((child, index) => {
          return (
            <div className="urp-divider" key={index}>
              <ChildrenItem>{ child }</ChildrenItem>
              {
                index !== children.length - 1 &&
                <Line layout='vertical' />
              }
            </div>
          )
        })
       }
      </div>
    )
  }

  // 无 children 情况，直接返回分割线
  return (
    <Line dashed={props.dashed} />
  )
}

function Line(
  props:
  { dashed?: boolean, layout?: 'horizontal' | 'vertical' }
) {
  props = { ...lineDefaultProps, ...props }
  const className = genClassNameFromProps(props, '', 'urp-line')
  return <div className={className} />
}

function ChildrenItem(
  { children }: 
  { 
    children?: React.ReactNode | undefined, 
  }
) {
  return <div className='children-item'>{ children }</div>
}
