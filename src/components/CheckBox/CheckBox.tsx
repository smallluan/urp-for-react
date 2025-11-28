import { createContext, useContext, useMemo, useState, useRef, useEffect, useCallback, memo } from 'react'
import { CheckBoxContextType, CheckBoxGroupType, CheckBoxItemType, Value } from './type'
import { groupDefaultProperties, itemDefaultProperties } from './properties.ts'
import { useMergedProps } from '../utils/tools/props.ts'
import { UrpIcon } from '../Icon/index.ts'
import './style.less'
import genClassNameFromProps from '../utils/tools/className.ts'
import { formatGroupProps } from './properties.ts'
const CheckBoxContext = createContext<CheckBoxContextType|undefined>(undefined)

const UrpCheckBoxGroup = (props: CheckBoxGroupType) => {
  // 调用工具函数，自动合并 props + 生成精准依赖
  const { merged: mergedProps } = useMergedProps(
    groupDefaultProperties,
    props,
    ['value', 'cancelable', 'disabled', 'readonly', 
      'name', 'onChange', 'multiple', 'selectLimit'],
    formatGroupProps
  )

  const { cancelable, name, multiple, value, selectLimit, onChange} = mergedProps
  const [currValue, setCurrValue] = useState<Value | Array<Value>>(value)
  const isOnSelectLimit = useMemo(() => {
    if (selectLimit !== -1 && Array.isArray(currValue) && currValue.length >= selectLimit) {
      return true
    }
    return false
  }, [currValue, selectLimit])

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
          if (selectLimit !== -1 && currValue.length >= Math.max(selectLimit, 1)) return
          setCurrValue((prev) => {
            Array.isArray(prev) && (prev = [...new Set([...prev, itemValue])])
            return prev
          })
        }
      }
    }
  }, [currValue, cancelable, multiple, selectLimit])

  const contextValue = useMemo(() => ({
    value: currValue,
    onChange: onItemChange,
    name: name,
    multiple: multiple,
    isOnSelectLimit: isOnSelectLimit,
  }), [currValue, onItemChange, name, multiple, isOnSelectLimit])

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
  const { value: contextValue, onChange, name, multiple, isOnSelectLimit } = context

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

  const checkBoxClass = useMemo(() => {
    const classname = genClassNameFromProps(
      { 
        disabled: disabled || 
                  (
                    isOnSelectLimit && 
                    Array.isArray(contextValue) && 
                    !contextValue.includes(value)
                  )
      },
      'urp-check-box-item',
      'urp-check-box-item'
    )
    return classname
  }, [disabled, isOnSelectLimit, contextValue, value])

  const boxClass = useMemo(() => {
    const classname = genClassNameFromProps(
      {
        multiple,
        radio: !multiple,
        isChecked,
        unChecked: !isChecked
      },
      'urp-check-box-box',
      'urp-check-box-box'
    )
    return classname
  }, [multiple, isChecked])

  const bgClass = useMemo(() => {
    const classname = genClassNameFromProps(
      { isChecked, unChecked: !isChecked },
      'urp-check-box-box-bg',
      'urp-check-box-box-bg'
    )
    return classname
  }, [isChecked])

  return(
    <label className={checkBoxClass}>
      <div className={boxClass}>
        <div className={bgClass}>
          {
            (multiple) &&
            <UrpIcon size='10px'style={{color: 'white',}}type="CheckOutlined"/>
          }
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
        props.children ? 
          UrpCheckBoxLabel({ children: props.children }) : 
          UrpCheckBoxLabel({ children: label })
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
