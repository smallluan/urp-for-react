/**
 * 根据组件的 props 生成对应的 style 对象
 * @param props -  组件的 props 对象
 * @returns - 处理好的 style 对象
 * @description - 所有不可枚举(或者很难枚举)的属性都应该被如此处理
 *              - 与 vue 和 小程序不同，此处必须返回的是一个对象，而不是一个字符串
 */
export default function genStyleFromPrpos<T extends object>(
  props: T
): Record<string, string> {
  const styles: Record<string, string> = {}

  for (const key in props) {
    const value = props[key]

    if (isValidCSSValue(String(value))) {
      styles[`--${String(key)}`] = String(value)
    }
  }

  return styles
}

/**
 * 判断一个 value 是否是合法的 css 
 * @param value - 被校验的值
 * @returns - 是否通过校验
 * @description - 函数的重点不在于包括所有的合法 CSS 值
 *              - 而是囊括所有的类型
 */
function isValidCSSValue(value: string): boolean {
 
  if (typeof value !== 'string' || !value.trim()) {
    return false
  }

  return (
    // 颜色值: <color> (red/#fff/rgb/rgba/hsl)
    CSS.supports('color', value) ||
    // 长度值: <length> (px/em/rem/vw/vh)
    CSS.supports('width', value) ||
    // 百分比: <percentage>
    CSS.supports('opacity', value) ||
    // 整数
    CSS.supports('z-index', value) ||
    // url
    CSS.supports('background-image', value) ||
    // 布局相关
    CSS.supports('align-items', value) ||
    CSS.supports('justify-content', value) ||
    // 补充
    CSS.supports('line-height', value)
  )
}
