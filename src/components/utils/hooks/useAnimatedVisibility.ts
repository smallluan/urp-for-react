import { useEffect, useRef, useState } from "react"

const useAnimatedVisibility = (
  propsVisible: boolean,
  timeOut = 200
) => {
  const timer = useRef<NodeJS.Timeout | null>(null)
  const [display, setDisplay] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }

    if (propsVisible) {
      setDisplay(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true)
        })
      })
    } else {
      setVisible(false)
      timer.current = setTimeout(() => {
        setDisplay(false)
      }, timeOut)
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [propsVisible])

  return {
    display,
    visible
  }
}

export default useAnimatedVisibility
