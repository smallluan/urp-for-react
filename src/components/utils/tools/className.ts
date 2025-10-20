/**
 * 根据组件的 props 生成对应的 className 字符串
 * @param props - 组件的 props 对象
 * @param excludeKeys - 不被处理的属性键名数组
 * @param prefix - className 的前缀
 * @param rootClassName - 根 className
 * @returns - 处理好的 className
 * @description - 所有可枚举的属性都应该被处理成这样
 *              - 然后作为className的一部分
 *              - 例如 layout-horizontal 
 */
export default function genClassNameFromProps<T>(
  props: T,
  rootClassName: string = '',
  prefix: string = '',
  excludeKeys: (keyof T)[] = []
): string {
  let className = ''
  prefix = prefix ? `${prefix}-` : ''

  for (let key in props) {
    if (excludeKeys.includes(key)) {
      continue
    }

    const value = props[key]

    if (typeof value === 'boolean' && !!value) {
      className += ` ${prefix}${key}`
    } else if (typeof value === 'string' && value) {
      className += ` ${prefix}${key}-${value}`
    } else if (typeof value === 'number') {
      className += ` ${prefix}${key}-${value}`
    }
  }

  return (rootClassName + ' ' + className).trim()
}
