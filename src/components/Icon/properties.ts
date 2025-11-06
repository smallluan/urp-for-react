import type { IconProps } from './type'

export const defaultIconProps: Partial<IconProps> = {
  size: 16,
  style: {
    color: 'inherit',
    fontSize: 16,
  },
  onClick: () => { return }
}

export const formatIconProps = (props: IconProps): IconProps => {
  const { size, style, ...rest } = props
  const finalStyle = {
    ...defaultIconProps.style,
    ...style,
    fontSize: size || style?.fontSize || defaultIconProps.style?.fontSize,
  }
  return {
    ...defaultIconProps,
    ...rest,
    size,
    style: finalStyle as IconProps['style'],
  }
}
