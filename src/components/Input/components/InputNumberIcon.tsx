import { UIcon } from "../../Icon/index.ts"

const InputNumberIcon = (
  props: {
    value: string,
    onChange: (value: number) => void
  }
) => {
  return (
    <span className="u-number-icons">
      <UIcon
        onClick={() => props.onChange(Number(props.value) + 1)}
        className="u-number-icon-up"
        type='CaretUpOutlined'
      />
      <UIcon
        onClick={() => props.onChange(Number(props.value) - 1)}
        className="u-number-icon-down"
        type='CaretDownOutlined'
      />
    </span>
  )
}

export default InputNumberIcon
