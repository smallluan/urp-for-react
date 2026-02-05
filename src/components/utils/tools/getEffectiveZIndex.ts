/**
 * 获取一个元素在页面上的 zIndex（考虑元素堆叠上下文）
 * @param element 
 * @returns 该元素实际 index
 */
const getEffectiveZIndex = (element: HTMLElement): number => {
  let currentElement: HTMLElement | null = element
  
  while (currentElement && currentElement !== document.documentElement) {
    const style = window.getComputedStyle(currentElement)
    const position = style.position
    const zIndex = style.zIndex
    
    // 检查是否是定位元素且设置了有效 z-index
    if (
      position !== 'static' && 
      position !== 'initial' && 
      position !== 'inherit' &&
      zIndex !== 'auto'
    ) {
      return parseInt(zIndex, 10)
    }
    
    currentElement = currentElement.parentElement
  }
  
  return 0 // 默认层级
}

export default getEffectiveZIndex
