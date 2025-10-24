/** import types */
import type { DividerType, ContextType, LineType } from './type'
import type React from 'react'

/** import scripts */
import { createContext, useContext } from 'react'
import genClassNameFromProps from '../utils/tools/className.ts'
import { getPartialProps } from '../utils/tools/properties.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'
import defaultProperties, { lineDefaultProps, linePropsCode } from './properties.ts'
import './style.less'
import { Layout } from '../utils/types/index.ts'

/** context */
const DividerContext = createContext<ContextType | undefined>(undefined)
/** context hook */
const useDividerContext = () => {
  const context = useContext(DividerContext)
  if (!context) {
    throw new Error('useDividerContext must be used within a DividerContext.Provider')
  }
  return context
}

/** components */
export default function Divider({ children, ...props }: DividerType) {
  // 合并默认属性和传入属性
  props = { ...defaultProperties, ...props }
  // context 传值
  const contextValue = { children, props }
  const _styles = genStyleFromPrpos(props)
  let innerElem = <Line/>

  if (typeof children === 'string') {
    innerElem = <PureDivide/>
  } else if (Array.isArray(children)) {
    if (props.layout === Layout.HORIZONTAL) {
      innerElem = GenHorizontalGroup(children, props.dashed)
    } else {
      innerElem = GenVertialGroup(children, props.dashed, props.slope)
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

function Line(_props?: Partial<LineType>) {
  let { props = {} } = useDividerContext() as { props: LineType }
  props = getPartialProps(props, linePropsCode)
  props.flex = _props?.flex || lineDefaultProps.flex
  const className = genClassNameFromProps(props, 'urp-line', 'urp-line')
  const _styles = genStyleFromPrpos(props)
  return <div style={_styles} className={className} />
}

function ChildrenItem(
  { children }: { children?: React.ReactNode | undefined }
) {
  return <div className='children-item'>{ children }</div>
}

function PureDivide() {
  const { children, props = {} } = useDividerContext()
  let leftFlex = 1
  let rightFlex = 1
  if (props.align === 'left') {
    leftFlex = 1
    rightFlex = 10
  } else if (props.align === 'right') {
    leftFlex = 10
    rightFlex = 1
  }

  return (
    <>
      <Line flex={leftFlex} />
        <ChildrenItem>{ children }</ChildrenItem>
      <Line flex={rightFlex} />
    </>
  )
}

// TODO
function GenHorizontalGroup(children, dashed) {
  return <div>水平组分割线暂不支持</div>
}

function GenVertialGroup(children, dashed, slope) {
  return (
    <>
      {
        children.map(
          (child, index) =>  (
            <div className="urp-divider" key={index}>
              <ChildrenItem>{ child }</ChildrenItem>
              {
                index !== children.length - 1 &&
                <Line/>
              }
            </div>
          )
        )
      }
    </>
  )
}
