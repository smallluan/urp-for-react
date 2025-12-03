import { GridRow, GridCol } from "./type"

export const rowDefaultProps: Required<GridRow> = {
  style: {},
  align: 'center',
  justify: 'center',
  gutter: 0,
  grids: 24,
  children: null
}

export const colDefaultProps: GridCol = {
  style: {},
  span: 0,
  offset: 0,
  children: null
}
