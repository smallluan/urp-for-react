import { forwardRef, useContext, useMemo } from "react"
import SelectContext from "../Context.ts"
import classNames from "classnames"
import UCheckBox from "../../CheckBox/CheckBox.tsx"
import USpace from "../../Space/Space.tsx"


const Options = forwardRef<HTMLDivElement, any>((props, ref) => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("Select 组件中 Options 未获取上下文数据")
  }

  const filtedOptions = useMemo(() => {
    if (context.hideSelected) {
      return context.options.filter(opt => opt.value !== context.value)
    }
    return context.options
  }, [context.options, context.hideSelected, context.value])

  return (
    <div style={{ width: '100%' }} ref={ref}>
      <UCheckBox.Group
      onChange={(newValue) => {
        context.onChange?.(newValue)
      }}
      defaultValue={context.defaultValue}
      multiple={context.multiple}
      cancelable={context.cancleable}
      selectLimit={context.selectLimit}
      value={context.value}
    >
      <USpace direction="vertical" gap={4}>
        {
          filtedOptions.map((item) => (
            <UCheckBox.Item
              key={item.value}
              labelOnly={!context.multiple && context.hideRadioCircle}
              className="check-box"
              value={item.value}
            >
              <div className={classNames("check-box-label", { "check-box-label-checked": item.value === context.value })}>{item.label}</div>
            </UCheckBox.Item>
          ))
        }
      </USpace>
    </UCheckBox.Group>
    </div>
  )
})

Options.displayName = 'SelectOptions'

export default Options
