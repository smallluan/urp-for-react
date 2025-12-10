import {CheckBoxGroupType, CheckBoxItemType, Value} from './type'

type CheckBoxDefaultProps = Omit<CheckBoxGroupType, 'value'>
type RequiredCheckBoxDefaultProps = Required<CheckBoxDefaultProps>
type MergedCheckBoxProps = RequiredCheckBoxDefaultProps & Pick<CheckBoxGroupType, 'value'>

export const groupDefaultProperties: RequiredCheckBoxDefaultProps = {
  defaultValue: '',
  cancelable: false,
  disabled: false,
  readonly: false,
  name: '',
  children: null,
  multiple: false,
  selectLimit: -1,
  checkedIcon: 'CheckOutlined',
  onChange: (value: Value | Array<Value>) => {return value},
}

export const itemDefaultProperties: Required<CheckBoxItemType> = {
  value: '',
  label: '选项一',
  disabled: false,
  readonly: false,
  children: null,
  labelOnly: false,
  onChange: (value: Value) => {return value},
}

/**
 * props 的约束条件
 * @param props - 属性值
 * @returns - 约束后的属性值
 */
export const formatGroupProps = (props: MergedCheckBoxProps)
:MergedCheckBoxProps => {

  const isTypeValue = (value: typeof props.value) => {
    return ['string', 'number', null].includes(typeof value)
  }
  // 如果为单选
  if (!props.multiple) {
    // 可选上限设置为 1 (好像也没啥用，selectLimit 最后只校验了多选情况)
    props.selectLimit = 1
    // 默认值不是 Value 以外的类型
    !isTypeValue(props.defaultValue) && (props.defaultValue = '')
  }
  // 如果为多选
  if (props.multiple) {
    // 如果为多选，默认不限制(暂时没办法知道里面有多少选项)
    if (props.selectLimit < 0) {
      props.selectLimit = -1
    }
    // 默认值必须是一个 Value[]
    if (
      !Array.isArray(props.defaultValue) ||
      props.defaultValue.some(item => !isTypeValue(item))
    ) {
      props.defaultValue = []
    }
  }
  return props
}
