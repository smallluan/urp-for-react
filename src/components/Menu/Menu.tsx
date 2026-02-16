import { Menu, SubMenu, MenuItem, Value } from "./type"
import { USpace } from "../Space/index.ts"
import { UCollapse } from "../Collapse/index.ts"
import "./style.less"
import UMenuHead from "./MenuHead.tsx"
import React, { useMemo, Children, cloneElement, useRef, useEffect, createContext, useState, useContext } from "react"
import genStyleFromProps from "../utils/tools/style.ts"
import UIcon from "../Icon/Icon.tsx"
import { UDivider } from "../Divider/index.ts"
import genClassNameFromProps from "../utils/tools/className.ts"

interface MenuContext {
  value: Value | undefined;
  handleItemClick: (value: Value) => void;
}

const MenuContext = createContext<MenuContext | null>(null)

const getChildrenValue = (children: Menu['children']): Value[] => {
  const values: Value[] = []
  Children.forEach(children, (child) => {
    if (child?.type === UMenuItem) {
      values.push(child.props.value)
    } else if (child?.type === USubMenu) {
      values.push(...getChildrenValue(child.props.children))
    }
  })

  return values
} 

const UMenu = (props: Menu) => {
  const { level: rootLevel = 1, children, ...rest } = props

  const isControlled = props.value !== undefined
  const [innerValue, setInnerValue] = useState(props.defaultValue)
  const finalValue = useMemo(() => (
    isControlled ? props.value : innerValue
  ), [isControlled, props.value, innerValue])
  
  const renderChildren = () => {
    return Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child
      return cloneElement(child, {
        level: (child.props.level || rootLevel),
      })
    })
  }

  const handleItemClick = (value: Value) => {
    if (isControlled) {
      props.onChange?.(value)
    } else {
      setInnerValue(value)
    }
  }

  return (
    <MenuContext.Provider value={{ 
      value: finalValue,
      handleItemClick: handleItemClick
    }}>
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
    </MenuContext.Provider>
    
  )
}

const USubMenu = (props: SubMenu) => {
  const context = useContext(MenuContext)
  const { level = 1, title, children } = props
  const collapseRef = useRef(null)
  const [active, setActive] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  
  const renderSubChildren = () => {
    return Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child
      return cloneElement(child, {
        level: level + 1,
      })
    })
  }

  useEffect(() => {
    const values = getChildrenValue(children)
    if (!isExpand && values.includes(context?.value)) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [context?.value, children, isExpand])

  return (
    <UCollapse.Panel
      onChange={(_, state) => setIsExpand(state)}
      ref={collapseRef}
      className="u-sub-menu"
      borderless
      iconPlacement="right"
      header={
        <MenuContainer active={active} icon={props.icon} level={level}>
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
  const { level = 1, children } = props
  
  return (
    <MenuContainer
      icon={props.icon}
      level={level}
      value={props.value}
    >
      {children}
    </MenuContainer>
  )
}

const MenuContainer = (props: {
  level: number,
  children: React.ReactNode,
  icon?: string,
  value?: Value,
  active?: boolean,
}) => {
  const context = useContext(MenuContext)

  const containerStyle = useMemo(() => (
    genStyleFromProps({ paddingLeft: `${props.level * 16}px` })
  ), [props.level])

  const containerClassName = useMemo(() => (
    genClassNameFromProps(
      {
        active: ((context?.value != null) && (props.value != null) && (context?.value === props.value)) || props.active
      },
      "u-meun-container",
      "u-meun-container"
    )
  ), [context?.value, props.value, props.active])

  return (
    <div
      style={containerStyle}
      className={containerClassName}
      onClick={() => {
        if (props.value !== undefined) {
          context?.handleItemClick(props.value)
        }
      }}
    >
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
