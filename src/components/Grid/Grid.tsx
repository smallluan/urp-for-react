import genStyleFromPrpos from "../utils/tools/style.ts"

import './style.less'

const UrpGridRow = (props) => {
  const rowStyle = genStyleFromPrpos({
    grids: props.grids
  })
  return(
    <div className="urp-grid-row" style={rowStyle}>
      {
        props.children
      }
    </div>
  )
}

const UrpGridCol = (props) => {
  const colStyle = genStyleFromPrpos({
    span: props.span
  })
  return(
    <div className="urp-grid-col" style={colStyle}>{props.children}</div>
  )
}

const UrpGrid = {
  Row: UrpGridRow,
  Col: UrpGridCol
}

export default UrpGrid