import { Layout } from '../utils/types/index.ts'

export interface DividerProps extends PropertiesType {
  children?: React.ReactNode[] | string | undefined
}

export interface PropertiesType {
  layout?: Layout.HORIZONTAL | Layout.VERTICAL,
  dashed?: boolean,
  align?: 'left' | 'center' | 'right'
  color?: string
}

