import React from "react"
import genClassNameFromProps from "../utils/tools/className.ts"
import genStyleFromProps from "../utils/tools/style.ts"

import './style.less'

const ULayout = (props) => {

  // 关键是有 aside 组件时，layout 需要水平布局
  const hasAside = React.Children.toArray(props.children).some(
    child => child.type === Aside
  )

  const layoutClass = genClassNameFromProps(
    {
      row: hasAside
    },
    'u-layout',
    'u-layout'
  )

  return(
    <div style={props.style} className={layoutClass}>
      {props.children}
    </div>
  )
}


const Head = (props) => {
  const headStyle = genStyleFromProps(
    {
      headHeight: props.height
    }
  )
  return(
    <div
      style={{...props.style, ...headStyle}}
      className={"u-layout-head " + (props.className ? props.className : '')}
    >
      {props.children}
    </div>
  )
}

const Body = (props) => {
  return(
    <div 
      className={"u-layout-body" + (props.className ? ` ${props.className}` : '')}
      style={props.style}
    >
      {props.children}
    </div>
  )
}

const Aside = (props) => {
  const AsideStyle = genStyleFromProps(
    {
      AsideWidth: props.width
    }
  )
  return(
    <div 
      style={{...props.style, ...AsideStyle}} 
      className={"u-layout-aside " + props.className}
    >
      {props.children}
    </div>
  )
}

const Footer = (props) => {
  const footerStyle = genStyleFromProps(
    {
      headHeight: props.height
    }
  )
  const footerClassName = genClassNameFromProps(
    {},
    "u-layout-footer",
    "u-layout-footer",
    props.className
  )
  return(
    <div
      style={{...props.style, ...footerStyle}}
      className={footerClassName}
    >
      {props.children}
    </div>
  )
}

// ULayout.displayName = 'ULayout'

ULayout.Head = Head
ULayout.Body = Body
ULayout.Aside = Aside
ULayout.Footer = Footer

export default ULayout
