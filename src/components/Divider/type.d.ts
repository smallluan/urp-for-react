import { Layout } from '../utils/types'

export interface DividerProps extends PropertiesType {
  children?: React.ReactNode[] | string | undefined
}

export interface PropertiesType {
  layout?: Layout.HORIZONTAL | Layout.VERTICAL,
  dashed?: boolean,
  align?: 'left' | 'center' | 'right'
  color?: string
}

/**
 * 所有可枚举的属性都应该被处理成这样，然后作为className的一部分
 * layout-horizontal
 * layout-vertical
 * dashed
 * align-left
 * align-center
 * align-right
 * 
 * 所有不可枚举的属性都应该作为style的一部分
 * --color: color
 */
