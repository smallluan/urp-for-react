import type { PropertiesType } from "./type"
import { Layout } from '../utils/types/index.ts'

const defaultProperties: PropertiesType = {
  layout: Layout.HORIZONTAL,
  dashed: false,
  align: 'center',
}

export const lineDefaultProps: Partial<PropertiesType> = {
  layout: Layout.HORIZONTAL,
  dashed: false
}

export default defaultProperties
