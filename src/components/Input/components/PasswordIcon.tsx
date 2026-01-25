import { UIcon } from "../../Icon/index.ts"

const PasswordIcon = (
  props: {
    passwordIconVisible: boolean,
    onIconClick: (value: boolean) => void
  }
) => {
  return (
    <span>
      {
        props.passwordIconVisible ? 
        <UIcon
          onClick={() => props.onIconClick(false)}
          className="u-close-icon"
          type='EyeInvisibleOutlined'
        /> :
        <UIcon
          onClick={() => props.onIconClick(true)}
          className="u-close-icon"
          type='EyeOutlined'
        />
      }
    </span>
  )
}

export default PasswordIcon
