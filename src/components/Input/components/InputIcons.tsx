import { UIcon } from "../../Icon/index.ts"

const InputIcons = (
  props: {
    icons: string | string[] | React.ReactNode
  }
) => {
  if (typeof props.icons === 'string') {
    return (
      <UIcon
        className="u-close-icon"
        type={props.icons}
      />
    )
  }
  if (Array.isArray(props.icons)) {
    return (
      props.icons.map((icon, index) => {
        if (typeof icon === 'string') {
          return (
            <UIcon
              key={index}
              className="u-close-icon"
              type={icon}
            /> 
          )
        } else {
          return (
            <span className="u-close-icon" key={index}>
              {icon}
            </span>
          )
        }
      })
    )
  }
  return (
    <span className="u-close-icon">
      {props.icons}
    </span>
  )
}

export default InputIcons
