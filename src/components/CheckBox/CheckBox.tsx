import { createContext, useContext, useMemo, useState, useRef, useEffect, useCallback, memo } from 'react'
import { CheckBoxContextType, CheckBoxGroupType, CheckBoxItemType, Value } from './type'
import { groupDefaultProperties, itemDefaultProperties } from './properties.ts'
import { useMergedProps } from '../utils/tools/props.ts'
import { UrpIcon } from '../Icon/index.ts'
import './style.less'

const CheckBoxContext = createContext<CheckBoxContextType|undefined>(undefined)

const UrpCheckBoxGroup = (props: CheckBoxGroupType) => {
  // 调用工具函数，自动合并 props + 生成精准依赖
  const { merged: mergedProps } = useMergedProps(
    groupDefaultProperties,
    props,
    ['value', 'cancelable', 'disabled', 'readonly', 'name', 'onChange', 'multiple']
  )

  const { cancelable, name, multiple, value, onChange} = mergedProps

  const [currValue, setCurrValue] = useState<Value | Array<Value>>(value)

  // 非组件首次渲染并且仅当值不一样时触发onChange
  const isFirst = useRef(true)
  const initCurrValue = useRef(value)

  useEffect(() => {
    if (isFirst.current || currValue === initCurrValue.current) { 
      isFirst.current = false 
      return
     }
    onChange(currValue)
  }, [currValue, onChange])

  const onItemChange = useCallback((itemValue: Value) => {
    if (!multiple) {
      if (itemValue === currValue) {
        if (cancelable) setCurrValue(null)
      } 
      else setCurrValue(itemValue)
    } else {
      if (Array.isArray(currValue)) {
        if (currValue.includes(itemValue)) {
          if (cancelable) {
            setCurrValue(prev => {
              if (Array.isArray(prev)) {
               return prev.filter(item => item !== itemValue)
              }
              return [prev]
            })
          }
        }
         else {
          setCurrValue((prev) => {
            Array.isArray(prev) && (prev = [...new Set([...prev, itemValue])])
            return prev
          })
        }
      }
    }
  }, [currValue, cancelable, multiple])

  const contextValue = useMemo(() => ({
    value: currValue,
    onChange: onItemChange,
    name: name,
    multiple: multiple
  }), [currValue, onItemChange, name, multiple])

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
  const { value: contextValue, onChange, name, multiple } = context

  const isFirstRender = useRef(true)
  useEffect(() => {
    isFirstRender.current = false
  }, [])

  const { merged: mergedProps } = useMergedProps(
    itemDefaultProperties,
    props,
    ['value', 'label', 'disabled', 'readonly']
  )

  const { value, label, disabled, readonly } = mergedProps
  
  const isChecked = useMemo(() => {
    if (!multiple) {
      return contextValue === value
    } else {
      if (Array.isArray(contextValue)) {
        return contextValue.includes(value)
      }
    }
  }, [multiple, contextValue, value])

  const itemClass = useMemo(() => {
    const classname = 'urp-check-box-item'
    return (disabled ? classname + '-disabled' : classname)
  }, [disabled])

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

  const checkBoxClass = useMemo(() => {
    let classname = 'urp-check-multiple-box'
    if (isChecked) {
      classname += ' urp-check-multiple-box-checked'
    } else {
      classname += ' urp-check-multiple-box-unchecked'
    }
    return classname
  }, [isChecked])

  const checkBoxBgClass = useMemo(() => {
    let classname = 'urp-check-box-bg'
    if (isChecked) {
      classname += ' urp-check-box-bg-checked-animate'
    } else {
      if (!isFirstRender.current) {
        classname += ' urp-check-box-bg-unchecked-animate'
      }
    }
    return classname
  }, [isChecked])

  return(
    <label className={itemClass}>
      {
        !multiple &&
        <>
        <div className={radioClass}/>
        <input
          type="checkbox"
          name={name}
          value={value as string} 
          onChange={(e) => {
            if (disabled || readonly) return
            onChange(value)
          }}
          checked={isChecked}
        />
        {
          props.children ? UrpCheckBoxLabel({children: props.children}) : label
        }
        </>
      }
      {
        multiple &&
        <>
        <div className={checkBoxClass}>
          <div className={checkBoxBgClass}>
            <UrpIcon 
              className='icon' 
              size='10px'
              style={{ 
                color: 'white',  
              }} 
              type="CheckOutlined"
            />
          </div>
        </div>
        <input
          type="checkbox"
          name={name}
          value={value as string} 
          onChange={(e) => { 
            if (disabled || readonly) return
            onChange(value)
          }}
          checked={isChecked}
        />
        {
          props.children ? UrpCheckBoxLabel({children: props.children}) : label
        }
        </>
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
