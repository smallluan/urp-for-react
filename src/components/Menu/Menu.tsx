import { Menu, SubMenu, MenuItem } from "./type"
import { USpace } from "../Space/index.ts"
import { UCollapse } from "../Collapse/index.ts"
import "./style.less"
import UMenuHead from "./MenuHead.tsx"
import React, { useMemo, Children, cloneElement } from "react"
import genStyleFromProps from "../utils/tools/style.ts"
import UIcon from "../Icon/Icon.tsx"
import { UDivider } from "../Divider/index.ts"

const UMenu = (props: Menu) => {
  const { level: rootLevel = 1, children, ...rest } = props
  
  const renderChildren = () => {
    return Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child
      return cloneElement(child, {
        level: (child.props.level || rootLevel),
      })
    })
  }

  return (
    <USpace block className="u-menu" direction="vertical" align="start" gap={4} {...rest}>
      {
        props.header &&
        <USpace block direction="vertical" align="start">
          {props.header}
          <UDivider color="var(--u-gray-color-1)"/>
        </USpace>
      }
      {renderChildren()}
      {
        props.footer &&
        <USpace block direction="vertical" align="start">
          <UDivider color="var(--u-gray-color-1)"/>
          {props.footer}
        </USpace>
      }
    </USpace>
  )
}

const USubMenu = (props: SubMenu) => {
  const { level = 1, title, children } = props
  
  const renderSubChildren = () => {
    return Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child
      return cloneElement(child, {
        level: level + 1,
      })
    })
  }

  return (
    <UCollapse.Panel
      className="u-sub-menu"
      borderless
      iconPlacement="right"
      header={
        <MenuContainer icon={props.icon} level={level}>
          {title}
        </MenuContainer>
      }
    >
      <USpace style={{ paddingTop: '4px' }} block direction="vertical" align="start" gap={4}>
        {renderSubChildren()}
      </USpace>
    </UCollapse.Panel>
  )
}

const UMenuItem = (props: MenuItem) => {
  const { level = 1, children, ...rest } = props
  
  return (
    <USpace block direction="vertical" align="start" gap={4} {...rest}>
      <MenuContainer icon={props.icon} level={level}>
        {children}
      </MenuContainer>
    </USpace>
  )
}

const MenuContainer = (props: {
  level: number,
  children: React.ReactNode,
  icon?: string
}) => {
  const containerStyle = useMemo(() => (
    genStyleFromProps({ paddingLeft: `${props.level * 16}px` })
  ), [props.level])

  return (
    <div style={containerStyle} className="u-meun-container">
      {
        props.icon &&
        <UIcon style={{ marginRight: '8px' }} type={props.icon}/>
      }
      {props.children}
    </div>
  )
}

UMenu.SubMenu = USubMenu
UMenu.Item = UMenuItem
UMenu.Head = UMenuHead

export default UMenu
