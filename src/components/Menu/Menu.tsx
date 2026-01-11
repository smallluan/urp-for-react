import { Menu, SubMenu, MenuItem } from "./type"
import { USpace } from "../Space/index.ts"
import { UPopup } from "../Popup/index.ts"
import { UIcon } from "../Icon/index.ts"
import { createContext, useContext, useMemo, useState } from "react"

import "./style.less"
import genClassNameFromProps from "../utils/tools/className.ts"

const MenuContext = createContext('menu')

const UMenu = (props: Menu) => {
  return (
    <MenuContext.Provider value="menu">
      <div className="u-menu">
        <USpace>
          { props.children }
        </USpace>
      </div>
    </MenuContext.Provider>
  )
}

const USubMenu = (props: SubMenu) => {

  const context = useContext(MenuContext)

  // 这里的 isHover 不仅包含此 menu 还包含这个 menu 的子菜单
  // 后续可能要拆出来该菜单自己被 hover 还是自菜单被 hover
  const [isHover, setIsHover] = useState(false)

  const subMenuClass = useMemo(() => {
    return genClassNameFromProps(
      {hover: isHover},
      'u-sub-menu',
      'u-sub-menu'
    )
  }, [isHover])
  
  return (
    <MenuContext.Provider value="submenu">
      <UPopup
        trigger="hover"
        position={ context === 'menu' ? 'bottom' : 'right' }
        contentClassName="u-sub-menu-popup-content"
        content={
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <USpace  direction="vertical">
              {props.children}
            </USpace>
          </div>
        }
      >
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <USpace className={subMenuClass}>
            { 
              props.icon && 
              <UIcon 
                size={16}
                type={props.icon}
              />
            }
            {props.title}
            <UIcon 
              size={10}
              className="u-submenu-arrow"
              type={ context === 'menu' ? "DownOutlined" : 'RightOutlined'}
            />
          </USpace> 
        </div>
      </UPopup>
    </MenuContext.Provider>
  )
}

const UMenuItem = (props: MenuItem) => {
  return (
    <USpace className="u-menu-item">
      {
        props.icon && 
        <UIcon size={16} type={props.icon} />
      }
      { props.children }
    </USpace>
  )
}

UMenu.SubMenu = USubMenu
UMenu.Item = UMenuItem

export default UMenu
