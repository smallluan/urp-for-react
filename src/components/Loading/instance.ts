import ULoading from "./Loading.tsx"
import { Loading } from "./type"
import { defaultProps } from "./properties.ts"
import createDynamicComponent, { DynamicComponentInstance } from "../utils/tools/createDynamicComponent.ts"

let loadingInstance: DynamicComponentInstance | null = null

/**
 * Loading 实例不需要配置 destroy 方法
 * 因为组件基于 OverLay 组件，已经天然支持隐藏式销毁能力
 */
const loading = {
  /**
   * 显示 loading
   * @param props - 自定义 props，与 defaultProps 合并 
   * @returns - Loading 实例
   */
  show: (props: Partial<Loading> = {}): DynamicComponentInstance => {
    // 如果已经有实例了，先销毁
    if (loadingInstance) {
      (loadingInstance as DynamicComponentInstance).destroy()
    }
    const finalProps = {
      ...defaultProps,
      ...props,
      visible: true,
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
      }
    } as Loading

    // 动态挂在原 ULoading 组件
    loadingInstance = createDynamicComponent(ULoading, finalProps)
    return loadingInstance
  },

  /**
   * 隐藏 Loading
   */
  hide: (): void => {
    if (loadingInstance) {
      loadingInstance.hide()
    }
  },

  /**
   * 更新 Loading 属性
   * @param props 要更新的 props
   */
  update: (props: Partial<Loading>): void => {
    if (loadingInstance) {
      loadingInstance.update(props)
    }
  },
}

export default loading
