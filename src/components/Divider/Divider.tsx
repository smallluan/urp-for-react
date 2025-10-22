import type { DividerProps, LineType } from './type'
import type React from 'react'
import genClassNameFromProps from '../utils/tools/className.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'
import defaultProperties, { lineDefaultProps } from './properties.ts'
import './style.less'
import { Layout } from '../utils/types/index.ts'

export default function Divider({ children, ...props }: DividerProps) {
  // 合并默认属性和传入属性
  props = { ...defaultProperties, ...props }
  const _styles = genStyleFromPrpos(props)
  let innerElem = <Line dashed={props.dashed} />

  if (typeof children === 'string') {
    innerElem = genPureDivide(children)
  } else if (Array.isArray(children)) {
    if (props.layout === Layout.HORIZONTAL) {
      innerElem = genHorizontalGroup()
    } else {
      innerElem = genVertialGroup(children, props.dashed, props.slope)
    }
  }

  return (
    <div style={_styles} className='urp-divider'>
      { innerElem }
    </div>
  )
}

function Line(props: LineType) {
  props = { ...lineDefaultProps, ...props }
  const className = genClassNameFromProps(props, 'urp-line', 'urp-line')
  return <div className={className} />
}

function ChildrenItem(
  { children }: { children?: React.ReactNode | undefined }
) {
  return <div className='children-item'>{ children }</div>
}

function genPureDivide(children: string) {
  return (
    <>
      <Line/>
        <ChildrenItem>{ children }</ChildrenItem>
      <Line/>
    </>
  )
}

function genHorizontalGroup() {
  return <div>水平组</div>
}

function genVertialGroup(children, dashed, slope) {
  return (
    <>
      {
        children.map(
          (child, index) =>  (
            <div className="urp-divider" key={index}>
              <ChildrenItem>{ child }</ChildrenItem>
              {
                index !== children.length - 1 &&
                <Line slope={slope} dashed={dashed} layout={Layout.VERTICAL} />
              }
            </div>
          )
        )
      }
    </>
  )
}
