import { useState, useRef, useEffect } from "react"

const useResizeObserver = () => {
  const [contentRect, setContentRect] = useState<DOMRectReadOnly>()
  const ref = useRef(null)

  useEffect(() => {
    const observerTarget = ref.current
    if (!observerTarget) return

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      setContentRect(entry.contentRect)
    })

    resizeObserver.observe(observerTarget)

    return () => {
      resizeObserver.unobserve(observerTarget)
    }
  }, [])

  return { ref, contentRect }
}

export default useResizeObserver
