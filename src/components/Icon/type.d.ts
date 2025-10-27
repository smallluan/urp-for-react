import type { CSSProperties } from 'react'
import type * as AllIcons from '@ant-design/icons'

export type AllIconsType = keyof typeof AllIcons;

export interface IconProps {
  type: AllIconsType | string;
  size?: number | string;
  style?: CSSProperties & { fontSize?: number };
  className?: string;
}