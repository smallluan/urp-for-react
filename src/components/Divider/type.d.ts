export interface LineType {
  layout?: 'horizontal' | 'vertical',
  dashed?: boolean,
  color?: string,
  slope?: boolean,
  flex?: number,
}

export interface PropertiesType extends Omit<LineType, 'flex'> {
  align?: 'left' | 'center' | 'right' | 'around' | 'between',
  space?: string
}

export interface DividerType extends PropertiesType {
  children?: React.ReactNode
}

export interface ContextType {
  children?: React.ReactNode,
  props?:PropertiesType
}
