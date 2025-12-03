
export type GridColElem = React.ReactElement<GridCol>

export type GridRowChildren = 
  | GridColElem
  | GridColElem[]
  | React.ReactElement<GridColElem>

export interface GridRow {
  style?: React.CSSProperties,
  align?: React.CSSProperties['alignItems'],
  justify?: React.CSSProperties['justifyContent'],
  gutter?: string | number,
  grids?: number,
  children?: GridRowChildren
}

export interface GridCol {
  style?: React.CSSProperties,
  span?: number,
  offset?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
  beforeOffset?: number,
  beforeSpan?: number,
  children?: React.ReactNode
}
