import { useEffect } from "react"
import { PopupProps } from "../type"

/**
 * 处理弹窗/浮层不同触发方式的 onChange 回调逻辑
 * @param trigger 触发方式
 * @param onChange 回调函数
 * @param mouseEnter 鼠标是否进入元素
 * @param clicked 元素是否被点击
 * @param rightClick 原始是否被鼠标右击
 * @param isControlled visible 是否受控
 */
const useTriggerOnChange = (
  trigger: PopupProps['trigger'],
  onChange: PopupProps['onChange'],
  mouseEnter: boolean,
  clicked: boolean,
  rightClick: boolean,
  isControlled: boolean
) => {
  useEffect(() => {
    // 受控模式下不调用 onChange
    if (isControlled) return

    switch(trigger) {
      case 'hover':
        onChange?.(mouseEnter)
        break
      case 'click':
        onChange?.(clicked)
        break
      case 'rightClick':
        onChange?.(rightClick)
        break
      default: break
    }
  }, [trigger, onChange, mouseEnter, clicked, rightClick, isControlled])
}

export default useTriggerOnChange
