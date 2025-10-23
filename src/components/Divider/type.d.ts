import { Layout } from '../utils/types/index.ts'

export interface LineType {
  layout?: Layout,
  dashed?: boolean,
  color?: string,
  slope?: boolean,
  flex?: number,
}

export interface PropertiesType extends Omit<LineType, 'flex'> {
  align?: 'left' | 'center' | 'right' | 'around' | 'between',
  space?: string
}

export interface DividerProps extends PropertiesType {
  children?: React.ReactNode[] | string | undefined
}
