/**
 * 根据组件的 props 生成对应的 className 字符串
 * @param props - 组件的 props 对象
 * @param excludeKeys - 不被处理的属性键名数组
 * @param prefix - className 的前缀
 * @param rootClassName - 根 className
 * @param extraClass - 额外的类，通常是 props 里面传过来的，有就加进来，没有就不加
 * @returns - 处理好的 className
 * @description - 所有可枚举的属性都应该被处理成这样
 *              - 然后作为className的一部分
 *              - 例如 layout-horizontal 
 */
export default function genClassNameFromProps<T extends object>(
  props: T,
  rootClassName = '',
  prefix = '',
  extraClass = '',
  excludeKeys: (keyof T)[] = [],
): string {
  let className = ''
  prefix = prefix ? `${prefix}-` : ''

  for (const key in props) {
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

  const finalClass = extraClass ? 
                    (rootClassName + className).trim() + ' ' + extraClass :
                    (rootClassName + className).trim()
  return finalClass
}
