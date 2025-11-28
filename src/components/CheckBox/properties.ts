import {CheckBoxGroupType, CheckBoxItemType, Value} from './type'

export const groupDefaultProperties: Required<CheckBoxGroupType> = {
  value: '',
  cancelable: false,
  disabled: false,
  readonly: false,
  name: '',
  children: null,
  multiple: false,
  selectLimit: -1,
  onChange: (value: Value | Array<Value>) => {return value},
}

export const itemDefaultProperties: Required<CheckBoxItemType> = {
  value: '',
  label: '选项一',
  disabled: false,
  readonly: false,
  children: null,
  onChange: (value: Value) => {return value},
}

export const formatGroupProps = (props: Required<CheckBoxGroupType>)
:Required<CheckBoxGroupType> => {

  const isTypeValue = (value: typeof props.value) => {
    return ['string', 'number', null].includes(typeof value)
  }
  // 如果为单选
  if (!props.multiple) {
    // 可选上限设置为 1 (好像也没啥用，selectLimit 最后只校验了多选情况)
    props.selectLimit = 1
    // 默认值不是 Value 以外的类型
    !isTypeValue(props.value) && (props.value = '')
  }
  // 如果为多选
  if (props.multiple) {
    // 如果为多选，默认不限制(暂时没办法知道里面有多少选项)
    if (props.selectLimit < 0) {
      props.selectLimit = -1
    }
    // 默认值必须是一个 Value[]
    if (
      !Array.isArray(props.value) ||
      props.value.some(item => !isTypeValue(item))
    ) {
      props.value = []
    }
  }
  return props
}
