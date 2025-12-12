import React from 'react'
import * as AllIcons from '@ant-design/icons'
import type { IconProps } from './type'
import { formatIconProps } from './properties.ts'

const UrpIcon: React.FC<IconProps> = (props) => {
  const finalProps = formatIconProps(props) as Required<IconProps>
  const { type, className, style, size, onClick, ...restProps } = finalProps

  const AntdIconComponent = AllIcons[type] as unknown as React.ComponentType<any>
  if (!AntdIconComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon type "${type}" is not supported. Check Ant Design icons docs.`)
    }
    return null
  }

  return (
    <AntdIconComponent
      data-testid='u-icon'
      {...restProps}
      style={{ ...style, fontSize: size || style?.fontSize }}
      className={`icon-custom ${className || ''}`}
      onClick={() => onClick()}
    />
  )
}

export default UrpIcon
