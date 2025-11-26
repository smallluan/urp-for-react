import { createContext, useContext, useMemo, useState, useRef, useEffect } from 'react'
import { CheckBoxContextType, CheckBoxGroupType, CheckBoxItemType, Value } from './type'
import { groupDefaultProperties, itemDefaultProperties } from './properties.ts'
import './style.less'

const CheckBoxContext = createContext<CheckBoxContextType|undefined>(undefined)

const UrpCheckBoxGroup = (props: CheckBoxGroupType) => {
  const mergedProps = useMemo(() => {
    return { ...groupDefaultProperties, ...props }
  }, [props])
  const { value, name, children, cancelable, onChange } = mergedProps
  const [currValue, setCurrValue] = useState<Value>(value)

  const onItemChange = (itemValue: Value) => {
    if (itemValue === currValue) {
      if (cancelable) {
        setCurrValue(null)
        onChange(null)
      }
    } else {
      setCurrValue(itemValue)
      onChange(itemValue)
    }
  }

  return(
    <CheckBoxContext.Provider value={{ value: currValue, onChange: onItemChange, name }}>
      <div>{ children }</div>
    </CheckBoxContext.Provider>
  ) 
}

const UrpCheckBoxItem = (props: CheckBoxItemType) => {
  const context =  useContext(CheckBoxContext)
  if (!context) {
    throw new Error('Radio 组件必须在 RadioGroup 组件内使用')
  }

  const isFirstRender = useRef(true)
  useEffect(() => {
    isFirstRender.current = false
  }, [])

  const mergedProps = useMemo(() => {
    return { ...itemDefaultProperties, ...props }
  }, [props])

  const { value, label, children } = mergedProps
  const { value: contextValue, onChange, name } = context

  const isChecked = useMemo(() => {
    return contextValue === value
  }, [contextValue, value])

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
        children ? UrpCheckBoxLabel({children}) : label
      }
    </label>
  )
}

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
