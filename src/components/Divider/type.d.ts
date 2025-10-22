import { Layout } from '../utils/types/index.ts'

export interface LineType {
  layout?: Layout,
  dashed?: boolean,
  color?: string,
  slope?: boolean
}

export interface PropertiesType extends LineType {
  align?: 'left' | 'center' | 'right'
}

export interface DividerProps extends PropertiesType {
  children?: React.ReactNode[] | string | undefined
}
