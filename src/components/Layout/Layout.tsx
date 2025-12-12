import React from "react"
import genClassNameFromProps from "../utils/tools/className.ts"
import genStyleFromPrpos from "../utils/tools/style.ts"

import './style.less'

const UrpLayout = (props) => {

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
    <div className={layoutClass}>
      {props.children}
    </div>
  )
}


const Head = (props) => {
  const headStyle = genStyleFromPrpos(
    {
      headHeight: props.height
    }
  )
  return(
    <div
      style={{...props.style, ...headStyle}}
      className="u-layout-head"
    >
      {props.children}
    </div>
  )
}

const Body = (props) => {
  return(
    <div className="u-layout-body">{props.children}</div>
  )
}

const Aside = (props) => {
  const AsideStyle = genStyleFromPrpos(
    {
      AsideWidth: props.width
    }
  )
  return(
    <div 
      style={{...props.style, ...AsideStyle}} 
      className="u-layout-aside"
    >
      {props.children}
    </div>
  )
}

const Footer = (props) => {
  const footerStyle = genStyleFromPrpos(
    {
      headHeight: props.height
    }
  )
  return(
    <div
      style={{...props.style, ...footerStyle}}
      className="u-layout-footer"
    >
      {props.children}
    </div>
  )
}

// UrpLayout.displayName = 'UrpLayout'

UrpLayout.Head = Head
UrpLayout.Body = Body
UrpLayout.Aside = Aside
UrpLayout.Footer = Footer

export default UrpLayout
