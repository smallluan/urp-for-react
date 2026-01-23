import { createRoot, Root } from "react-dom/client"
import React from "react"

export interface DynamicComponentInstance  {
  update: (props: Partial<any>) => void;
  destroy: () => void;
  show: () => void;
  hide: () => void;
}

export default function createDynamicComponent<T>(
  Component: React.ComponentType<T>,
  initialProps: T,
  container?: HTMLElement,
): DynamicComponentInstance {
  // 创建/获取挂载容器
  const mountContainer = container || document.createElement('div')
  if (!container) {
    document.body.appendChild(mountContainer)
  }

  // 存储当前的 props（用于更新）
  let currentProps = { ...initialProps }
  // 创建 React Root
  const root: Root = createRoot(mountContainer)
  
  // 渲染组件
  const renderComponent = () => {
    root.render(React.createElement(Component, currentProps))
  }
  renderComponent()

  return {
    update: (newProps: Partial<T>) => {
      currentProps = { ...currentProps, ...newProps }
      renderComponent()
    },
    destroy: () => {
      root.unmount()
      if (!container) {
        document.body.removeChild(mountContainer)
      }
    },
    show: () => {
      // 安全判断：只有组件有 visible 属性时才操作
      if ('visible' in currentProps) {
        // 类型断言保证类型安全
        currentProps = { 
          ...currentProps, 
          visible: true as T[keyof T] 
        }
        renderComponent()
      }
    },
    hide: () => {
      if ('visible' in currentProps) {
        currentProps = { 
          ...currentProps, 
          visible: false as T[keyof T] 
        }
        renderComponent()
      }
    }
  }
}