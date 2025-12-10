export type SpaceGap = string | number

export interface SpaceProps {
  children?: React.ReactNode,
  align?: 'start' | 'end' | 'center',
  direction?: 'vertial' | 'horizontal',
  overflow?: 'breakLine' | 'scroll' | 'hidden',
  gap?: SpaceGap | SpaceGap[],
  scrollBar?: 'display' | 'none' | 'x' | 'y',
  className?: string,
  style?: React.CSSProperties,
}
