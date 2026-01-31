import { useEffect, useRef, ReactNode } from "react"
import { createPortal } from "react-dom"

interface PortalContainerProps {
  children: ReactNode;
  target?: HTMLElement;
}

const PortalContainer = ({ children, target = document.body }: PortalContainerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = document.createElement('div')
    target.appendChild(container)
    containerRef.current = container

    return () => {
      if (containerRef.current) {
        target.removeChild(containerRef.current)
      }
    }
  }, [target])

  if (!containerRef.current) return null
  return createPortal(children, containerRef.current)
}

export default PortalContainer
