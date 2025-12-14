import { Select } from "./type"

export const defaultProps: Select = {
  multiple: false,
  options: [],
  value: '',
  defaultValue: '',
  borderless: false,
  position: 'bottom',
  clearable: false,
  hideSelected: false,
  hideRadioCircle: true,
  inputable: false,
  cancleable: false,
  selectLimit: -1,
  maxVisibleNum: -1,
  size: 'normal'
}

/**
 * 属性值约束
 * @param props 
 */
export const formatProps = (props: Select) => {

  if (!props.options) {
    throw new Error('Select 组件需要传入 options')
  }

  if (!Array.isArray(props.options)) {
    props.options = [{ label: props.options, value: props.options }]
  } else {
    props.options.forEach(opt => {
      // 对于选项中的字符串，默认将 label 和 value 都是设置为他本身
      if (typeof opt === 'string') {
        opt = {label: opt, value: opt}
      }
    })
  }

  if (props.multiple) {
    // 多选不允许隐藏已选择项
    props.hideSelected = false
  }
  
  return props
} 
