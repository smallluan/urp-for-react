
export type GridColElem = React.ReactElement<GridCol>

export type GridRowChildren = 
  | GridColElem
  | GridColElem[]
  | React.ReactElement<GridColElem>

export interface GridRow {
  className: string;
  style?: React.CSSProperties;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  gutter?: string | number;
  grids?: number;
  children?: GridRowChildren | React.ReactNode;
}

export interface GridCol {
  className?: string;
  style?: React.CSSProperties;
  span?: number;
  offset?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  beforeOffset?: number;
  beforeSpan?: number
  children?: React.ReactNode;
}
