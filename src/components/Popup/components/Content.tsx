import { useMemo } from "react"
import genClassNameFromProps from "../../utils/tools/className.ts"
// import genStyleFromProps from "../../utils/tools/style.ts"

const UPopupContent = (
  props: {
    children: React.ReactNode,
    className: string,
    style: React.CSSProperties,
    display: boolean,
    visible: boolean,
    destoryOnClose: boolean,
    position: {left: string, top: string}
  }
) => {

  const contentClassName = useMemo(() => {
    return genClassNameFromProps(
      {
        display: props.display,
        visible: props.visible,
        hide: !props.destoryOnClose && !props.display
      },
      'u-popup-content',
      'u-popup-content',
      props.className
    )
  }, [props.display, props.visible, props.className, props.destoryOnClose])

  // const contentStyle = useMemo(() => {
  //   return genStyleFromProps(
  //     {
  //       left: `${props.position.left}px`,
  //       bottom: `${props.position.bottom}px`
  //     }
  //   )
  // }, [props.position])

  return (
    <>
      {
        (
          (props.destoryOnClose && props.display) ||
          !props.destoryOnClose
        ) &&
        <div
          className={contentClassName}
          style={{...props.style, ...props.position}}
        >
          {props.children}
        </div>
      } 
    </>
  )
}

export default UPopupContent
