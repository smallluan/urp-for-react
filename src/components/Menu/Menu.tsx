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

// 🔥 修改1：移除Context中的expand/defaultExpand字段
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
  const { level: rootLevel = 1, children, expand, defaultExpand, ...rest } = props

  const isControlled = props.value !== undefined
  const [innerValue, setInnerValue] = useState(props.defaultValue)
  const finalValue = useMemo(() => (
    isControlled ? props.value : innerValue
  ), [isControlled, props.value, innerValue])
  
  const renderChildren = () => {
    return Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child
      // 🔥 修改2：给SubMenu透传expand/defaultExpand属性（其他组件透传无影响）
      return cloneElement(child, {
        level: (child.props.level || rootLevel),
        expand: props.expand,       // 受控展开列表
        defaultExpand: props.defaultExpand // 非受控默认展开列表
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
      handleItemClick: handleItemClick // 🔥 移除了expand/defaultExpand
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
  const { 
    level = 1, 
    title, 
    children, 
    value: subMenuValue, // SubMenu的唯一标识（需确保SubMenu有value属性）
    expand: menuExpand,  // 从UMenu透传的受控展开列表（数组）
    defaultExpand: menuDefaultExpand // 从UMenu透传的非受控默认展开列表（数组）
  } = props
  
  const collapseRef = useRef(null)
  const [active, setActive] = useState(false)

  // 🔥 修改3：处理SubMenu展开的受控/非受控逻辑
  // 1. 判断是否为受控模式（UMenu传入了expand）
  const isControlledExpand = menuExpand !== undefined
  // 2. 非受控模式：用defaultExpand初始化内部展开状态
  const [innerIsExpand, setInnerIsExpand] = useState(() => {
    // 默认展开：如果defaultExpand包含当前SubMenu的value，则初始展开
    return menuDefaultExpand?.includes(subMenuValue) || false
  })
  // 3. 最终的展开状态：受控取外部值，非受控取内部状态
  const finalIsExpand = useMemo(() => {
    if (isControlledExpand) {
      return menuExpand?.includes(subMenuValue) || false
    }
    return innerIsExpand
  }, [isControlledExpand, menuExpand, subMenuValue, innerIsExpand])

  const renderSubChildren = () => {
    return Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child
      return cloneElement(child, {
        level: level + 1,
        // 🔥 递归透传expand/defaultExpand给子级SubMenu
        expand: menuExpand,
        defaultExpand: menuDefaultExpand
      })
    })
  }

  useEffect(() => {
    const values = getChildrenValue(children)
    if (!finalIsExpand && values.includes(context?.value)) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [context?.value, children, finalIsExpand])

  const subMenuClassName = useMemo(() => (
    genClassNameFromProps(
      {},
      "u-sub-menu",
      "u-sub-menu",
      props.className
    )
  ))

  return (
    <UCollapse.Panel
      // 🔥 修改4：给Collapse.Panel传递展开属性（区分受控/非受控）
      expand={isControlledExpand ? finalIsExpand : undefined} // 受控时传expand
      defaultExpand={isControlledExpand ? undefined : finalIsExpand} // 非受控时传defaultExpand
      onChange={(_, state) => !isControlledExpand && setInnerIsExpand(state)} // 非受控时更新内部状态
      ref={collapseRef}
      className={subMenuClassName}
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
