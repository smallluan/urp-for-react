import { forwardRef, useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalContainerProps {
  children: React.ReactNode
  target?: HTMLElement
  className?: string
}

const PortalContainer = forwardRef<HTMLDivElement, PortalContainerProps>(
  ({ children, target = document.body, className = '' }, externalRef) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [containerCreated, setContainerCreated] = useState(false)

    useEffect(() => {
      // 1. 初始化：创建容器并挂载到target
      if (!containerRef.current) {
        const container = document.createElement('div')
        containerRef.current = container
        target.appendChild(container)

        // 传递ref给外部
        if (externalRef) {
          if (typeof externalRef === 'function') {
            externalRef(container)
          } else {
            externalRef.current = container
          }
        }

        setContainerCreated(true)
      }

      if (containerRef.current && className) {
        containerRef.current.className = className
      }

      return () => {
        if (containerRef.current) {
          target.removeChild(containerRef.current)
        }
        if (externalRef) {
          if (typeof externalRef === 'function') {
            externalRef(null)
          } else {
            externalRef.current = null
          }
        }
        containerRef.current = null
        setContainerCreated(false) 
      }
    }, [target, externalRef, className])

    // 容器未创建时返回null，创建完成后执行createPortal
    if (!containerRef.current || !containerCreated) return null
    return createPortal(children, containerRef.current)
  }
)

PortalContainer.displayName = 'PortalContainer'

export default PortalContainer