import { Select } from "./type"
import genClassNameFromProps from "../utils/tools/className.ts"

import { UrpIcon } from "../Icon/index.ts"

import "./style.less"
import { useMemo, useState } from "react"

const UrpSelect = (props: Select) => {

  // const [mouseEnter, setMouseEnter] = useState(false)
  const [mouseFocus, setMouseFocus] = useState(false)

  // const selectClass = useMemo(() => {
  //   return genClassNameFromProps(
  //     {
  //       hover: mouseEnter
  //     }
  //   )
  // })

  const arrowIconClass = useMemo(() => {
    return genClassNameFromProps(
      {
        down: !mouseFocus,
        up: mouseFocus,
      },
      'urp-select-icon-arrow',
      'urp-select-icon-arrow'
    )
  }, [mouseFocus])

  return(
    <div
     className="urp-select"
     tabIndex={0}
    //  onMouseEnter={() => setMouseEnter(true)}
    //  onMouseLeave={() => setMouseEnter(false)}
     onFocus={() => setMouseFocus(true)}
     onBlur={() => setMouseFocus(false)}
     >
      {
        mouseFocus &&
        <div>啦啦啦</div>
      }
      <UrpIcon 
        className={arrowIconClass} 
        type="DownOutlined"
      />
    </div>
  )
}

export default UrpSelect
