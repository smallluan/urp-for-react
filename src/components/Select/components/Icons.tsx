import { useContext, useMemo } from "react"
import UrpSpace from "../../Space/Space.tsx"
import UrpIcon from "../../Icon/Icon.tsx"
import SelectContext from "../Context.ts"
import genClassNameFromProps from "../../utils/tools/className.ts"

/**
 * 选择器中间框体右侧图标区域
 * 单独写成一个组件是因为后面可能会涉及到icon的扩展
 */
const Icons = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("Select 组件中 Icons 未获取上下文数据")
  }

  const arrowIconClass = useMemo(() => {
    return genClassNameFromProps(
      {
        down: !context.isFocus,
        up: context.isFocus,
      },
      'u-select-icon-arrow',
      'u-select-icon-arrow'
    )
  }, [context.isFocus])

  const showCloseIcon = useMemo(() => {
    return (
      context.clearable &&
      (context.mouseEnter || context.isFocus) &&
      (
        context.multiple ?
          context.value?.length !== 0 :
          context.value !== ''  // checkbox 好像单选的时候什么都没选中返回的是空字符
      )
    )
  }, [context.clearable, context.mouseEnter, context.isFocus, context.multiple, context.value])

  return (
    <UrpSpace
      className="u-select-icons"
      gap={4}
    >
      {
        showCloseIcon ?
        <UrpIcon
          onClick={context.onClearValue}
          className="u-select-icon"
          type="CloseCircleOutlined"
        />
        :
        <UrpIcon
          className={arrowIconClass}
          type="DownOutlined"
        />
      }
    </UrpSpace>
  )
}

export default Icons
