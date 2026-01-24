import UDialog from "./Dialog.tsx"
import { Dialog } from "./type"
import { defaultProps } from "./properties.ts"
import createDynamicComponent, { DynamicComponentInstance } from "../utils/tools/createDynamicComponent.ts"

let dialogInstance: DynamicComponentInstance | null = null

/**
 * Dialog 实例不需要配置 destroy 方法
 * 因为组件基于 OverLay 组件，已经天然支持隐藏式销毁能力
 */
const dialog = {
  /**
   * 显示 dialog
   * @param props - 自定义 props，与 defaultProps 合并 
   * @returns - Dialog
   */
  show: (props: Partial<Dialog> = {}): DynamicComponentInstance => {
    // 如果已经有实例了，先销毁
    if (dialogInstance) {
      (dialogInstance as DynamicComponentInstance).destroy()
    }
    const finalProps = {
      ...defaultProps,
      ...props,
      visible: true
    } as Dialog

    // 动态挂在原 UDialog 组件
    dialogInstance = createDynamicComponent(UDialog, finalProps)
    return dialogInstance
  },

  /**
   * 隐藏 Loading
   */
  hide: (): void => {
    if (dialogInstance) {
      dialogInstance.hide()
    }
  },

  /**
   * 更新 Loading 属性
   * @param props 要更新的 props
   */
  update: (props: Partial<Dialog>): void => {
    if (dialogInstance) {
      dialogInstance.update(props)
    }
  }
}

export default dialog
