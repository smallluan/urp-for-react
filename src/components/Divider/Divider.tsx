/** import types */
import type { DividerProps, LineType } from './type'
import type React from 'react'
/** import scripts */
import { createContext, useContext } from 'react'
import genClassNameFromProps from '../utils/tools/className.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'
import defaultProperties, { lineDefaultProps } from './properties.ts'
import './style.less'
import { Layout } from '../utils/types/index.ts'

const DividerContext = createContext<DividerProps | undefined>(undefined)
const useDividerContext = () => {
  const context = useContext(DividerContext)
  if (!context) {
    throw new Error('useDividerContext must be used within a DividerContext.Provider')
  }
  return context
}

export default function Divider({ children, ...props }: DividerProps) {
  // 合并默认属性和传入属性
  props = { ...defaultProperties, ...props }
  // context 传值
  const contextValue = { children, ...props }
  const _styles = genStyleFromPrpos(props)
  let innerElem = <Line dashed={props.dashed} />

  if (typeof children === 'string') {
    innerElem = genPureDivide(children, props.align)
  } else if (Array.isArray(children)) {
    if (props.layout === Layout.HORIZONTAL) {
      innerElem = genHorizontalGroup(children, props.dashed)
    } else {
      innerElem = genVertialGroup(children, props.dashed, props.slope)
    }
  }

  return (
    <DividerContext.Provider value={contextValue}>
      <div style={_styles} className='urp-divider'>
        { innerElem }
      </div>
    </DividerContext.Provider>
  )
}

function Line(props: LineType) {
  const context = useDividerContext()
  props = { ...lineDefaultProps, ...props }
  const className = genClassNameFromProps(props, 'urp-line', 'urp-line')
  const _styles = genStyleFromPrpos(props)
  return <div style={_styles} className={className} />
}

function ChildrenItem(
  { children }: { children?: React.ReactNode | undefined }
) {
  return <div className='children-item'>{ children }</div>
}

function genPureDivide(children: DividerProps['children'], align: DividerProps['align']) {
  // const className = genClassNameFromProps(props, 'urp-single-child-divider', 'urp-single-child-divider')
  return (
    <>
      <Line />
        <ChildrenItem>{ children }</ChildrenItem>
      <Line/>
    </>
  )
}

function genHorizontalGroup(children, dashed) {
  return <div>水平组分割线暂不支持</div>
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
