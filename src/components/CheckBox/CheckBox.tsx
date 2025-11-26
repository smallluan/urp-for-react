import { createContext, useContext, useMemo, useState, useRef, useEffect, useCallback, memo } from 'react'
import { CheckBoxContextType, CheckBoxGroupType, CheckBoxItemType, Value } from './type'
import { groupDefaultProperties, itemDefaultProperties } from './properties.ts'
import { useMergedProps } from '../utils/tools/props.ts'
import './style.less'

const CheckBoxContext = createContext<CheckBoxContextType|undefined>(undefined)

const UrpCheckBoxGroup = (props: CheckBoxGroupType) => {
  // 调用工具函数，自动合并 props + 生成精准依赖
  const { merged: mergedProps } = useMergedProps(
    groupDefaultProperties,
    props,
    ['value', 'cancelable', 'disabled', 'readonly', 'name', 'onChange']
  )

  const [currValue, setCurrValue] = useState<Value>(mergedProps.value)

  const { cancelable, onChange} = mergedProps

  const onItemChange = useCallback((itemValue: Value) => {
    if (itemValue === currValue) {
      if (cancelable) {
        setCurrValue(null)
        onChange(null)
      }
    } else {
      setCurrValue(itemValue)
      onChange(itemValue)
    }
  }, [currValue, cancelable, onChange])

  const contextValue = useMemo(() => ({
    value: currValue,
    onChange: onItemChange,
    name: mergedProps.name,
  }), [currValue, onItemChange, mergedProps.name])

  return(
    <CheckBoxContext.Provider value={contextValue}>
      <div>{ props.children }</div>
    </CheckBoxContext.Provider>
  ) 
}

const UrpCheckBoxItem = memo((props: CheckBoxItemType) => {
  const context =  useContext(CheckBoxContext)
  if (!context) {
    throw new Error('Radio 组件必须在 CheckBox 组件内使用')
  }

  const isFirstRender = useRef(true)
  useEffect(() => {
    isFirstRender.current = false
  }, [])

  const { merged: mergedProps } = useMergedProps(
    itemDefaultProperties,
    props,
    ['value', 'label',]
  )

  const { value, label } = mergedProps
  const { value: contextValue, onChange, name } = context

  const isChecked = contextValue === value

  const radioClass = useMemo(() => {
    let classname = 'urp-radio'
    if (isChecked) {
      classname += ' urp-radio-checked'
      classname += ' urp-radio-checked-animate'
    } else {
      classname += ' urp-radio-unchecked'
      if (!isFirstRender.current) {
        classname += ' urp-radio-unchecked-animate'
      }
    }
    return classname
  }, [isChecked])

  return(
    <label className="urp-radio-item">
      <div className={radioClass}/>
      <input
        type="checkbox"
        name={name}
        value={value as string} 
        onChange={(e) => { onChange(value) }}
        checked={isChecked}
      />
      {
        props.children ? UrpCheckBoxLabel({children: props.children}) : label
      }
    </label>
  )
})

UrpCheckBoxItem.displayName = 'UrpCheckBoxItem'

const UrpCheckBoxLabel = (props: { children: React.ReactNode }) => {
  return(
    <span className="urp-checkbox-label">{ props.children }</span>
  )
}

const CheckBox = {
  Group: UrpCheckBoxGroup,
  Item: UrpCheckBoxItem,
  Label: UrpCheckBoxLabel,
}

export default CheckBox
