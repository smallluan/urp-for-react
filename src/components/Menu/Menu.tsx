import { Menu, SubMenu, MenuItem } from "./type"
import { USpace } from "../Space/index.ts"
import { UPopup } from "../Popup/index.ts"
import { createContext, useContext } from "react"

import "./style.less"

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
  
  return (
    <MenuContext.Provider value="submenu">
      <UPopup
        trigger="hover"
        position={ context === 'menu' ? 'bottom' : 'right' }
        content={
          <USpace direction="vertical">
            {props.children}
          </USpace>
        }
      >
        <div className="u-sub-menu">{props.title}</div>
      </UPopup>
    </MenuContext.Provider>
  )
}

const UMenuItem = (props: MenuItem) => {
  return (
    <div className="u-menu-item">
      { props.children }
    </div>
  )
}

UMenu.SubMenu = USubMenu
UMenu.Item = UMenuItem

export default UMenu
