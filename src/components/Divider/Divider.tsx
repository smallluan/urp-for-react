/** import types */
import type React from 'react'
import type { DividerType, ContextType, LineType } from './type'
import { Layout } from '../utils/types/index.ts'

/** import scripts */
import { createContext, useContext } from 'react'
import genClassNameFromProps from '../utils/tools/className.ts'
import { getPartialProps } from '../utils/tools/properties.ts'
import genStyleFromPrpos from '../utils/tools/style.ts'
import defaultProperties, { lineDefaultProps, linePropsCode, formatProps } from './properties.ts'
import classNames  from 'classnames'

/** import less */
import './style.less'


/** context */
const DividerContext = createContext<ContextType | undefined>(undefined)
/** context hook */
const useDividerContext = () => {
  const context = useContext(DividerContext)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  return context
}


/** 
 * 主组件(默认导出组件)
*/
export default function UrpDivider({ children, ...props }: DividerType) {
  // 合并默认属性和传入属性，在子组件层不需要单独合并了
  const _props = formatProps({ ...defaultProperties, ...props })

  // context 传值
  const contextValue = { children, props: _props }
  const _styles = genStyleFromPrpos(_props)

  // 根据标签子元素数量不同进行不同的处理
  let innerElem = <Line/>

  if (children != null && !Array.isArray(children)) {
    innerElem = <LineWithChild/>
  } else if (Array.isArray(children)) {
    if (_props.layout === Layout.HORIZONTAL) {
      innerElem = <GenHorizontalGroup/>
    } else {
      innerElem = <GenVertialGroup/>
    }
  }

  // 合成 className
  const _class = classNames('u-divider', {
    'u-divider-vertical': _props.layout === Layout.VERTICAL
  })

  return (
    // Divider 组件绝大多数是静态场景，使用 context 造成的影响很小
    <DividerContext.Provider value={contextValue}>
      <div 
        data-testid="u-divider" 
        style={_styles} 
        className={_class}
      >
        { innerElem }
      </div>
    </DividerContext.Provider>
  )
}


/**
 * Line 单个线条组件
 * @param _props - 外部组件传递给 Line 的私有属性，即在类型中不被继承的属性
 */
function Line(_props?: Partial<LineType>) {
  let { props = {} } = useDividerContext() as { props: LineType }

  // 设置 props
  props = getPartialProps(props, linePropsCode)
  props.flex = _props?.flex || lineDefaultProps.flex

  // 生成静态类名和动态样式
  const className = genClassNameFromProps(props, 'u-line', 'u-line')
  const _styles = genStyleFromPrpos(props)

  // 返回线条的 jsx
  return <div style={_styles} className={className} />
}


/**
 * 每个传入的元素子项
 * @param param0 - 子项元素
 */
function ChildrenItem(
  { children }: { children?: React.ReactNode | undefined }
) {
  return <div className='children-item'>{ children }</div>
}


/**
 * 携带内容的单线条(适配左右布局)
 */
function LineWithChild() {
  const { children, props = {} } = useDividerContext()
  // 设置左、右线条的 flex
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


/**
 * 水平组
 */
function GenHorizontalGroup() {
  const children = useDividerContext().children as React.ReactNode[]
  return (<>{
    children.map((child, index) => {
      return (
        <div key={index} style={{ 'flex': 1 }}>
          <UrpDivider >{ child }</UrpDivider>
        </div>
      )
    })
  }</>)
}


/**
 * 垂直组
 */
function GenVertialGroup() {
  const children = useDividerContext().children as React.ReactNode[]
  return (<>{
    children.map((child, index) =>  (
      <div className="u-divider" key={index}>
        <ChildrenItem>{ child }</ChildrenItem>
        {
          index !== children.length - 1 &&
          <Line/>
        }
      </div>
    ))
  }</>)
}
