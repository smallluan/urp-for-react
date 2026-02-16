import { Menu, SubMenu, MenuItem } from "./type"

import "./style.less"
import UMenuHead from "./MenuHead.tsx"

const UMenu = (props: Menu) => {
  return (
    <div>111</div>
  )
}

const USubMenu = (props: SubMenu) => {

  
  return (
    <div>222</div>
  )
}

const UMenuItem = (props: MenuItem) => {
  return (
    <div>333</div>
  )
}

UMenu.SubMenu = USubMenu
UMenu.Item = UMenuItem
UMenu.Head = UMenuHead

export default UMenu
