import { createContext, useContext, useMemo, useState, useRef, useEffect, useCallback, memo } from 'react'
import { CheckBoxContextType, CheckBoxGroupType, CheckBoxItemType, Value } from './type'
import { groupDefaultProperties, itemDefaultProperties } from './properties.ts'
import useMergedProps from '../utils/hooks/useMergedProps.ts'
import { UIcon } from '../Icon/index.ts'
import './style.less'
import genClassNameFromProps from '../utils/tools/className.ts'
import { formatGroupProps } from './properties.ts'
const CheckBoxContext = createContext<CheckBoxContextType|undefined>(undefined)

const UCheckBoxGroup = (props: CheckBoxGroupType) => {
  // 调用工具函数，自动合并 props + 生成精准依赖
  const { merged: _props } = useMergedProps(
    groupDefaultProperties,
    props,
    ['cancelable', 'disabled', 'readonly', 'defaultValue',
      'name', 'onChange', 'multiple', 'selectLimit', 'checkedIcon'],
    formatGroupProps
  )
  // 是否是受控属性
  const isControlled = props.value !== undefined
  // 内部属性
  const [innerValue, setInnerValue] = useState(_props.defaultValue)
  // 当前状态（综合受控与非受控）
  const currValue = (isControlled ? props.value : innerValue) as Value | Array<Value>

  const { cancelable, name, multiple, selectLimit, checkedIcon, onChange} = _props

  // 判断是否超出最大限制（多选）
  const isOnSelectLimit = useMemo(() => {
    return selectLimit !== -1 && 
           Array.isArray(currValue) && 
           currValue.length >= selectLimit
  }, [currValue, selectLimit])

  // 非组件首次渲染并且仅当值不一样时触发onChange
  const isFirst = useRef(true)
  const initCurrValue = useRef(currValue)

  useEffect(() => {
    if (isFirst.current || currValue === initCurrValue.current) { 
      isFirst.current = false 
      return
    }
    if (!isControlled) {
      onChange?.(currValue)
    }
  }, [currValue, onChange, isControlled])

  const onItemChange = useCallback((itemValue: Value) => {
    if (!isControlled) {
      if (!multiple) {
        if (itemValue === currValue) {
          if (cancelable) setInnerValue(null)
        } 
        else setInnerValue(itemValue)
      } else {
        if (Array.isArray(currValue)) {
          if (currValue.includes(itemValue)) {
            if (cancelable) {
              setInnerValue(prev => {
                if (Array.isArray(prev)) {
                return prev.filter(item => item !== itemValue)
                }
                return [prev]
              })
            }
          }
          else {
            if (selectLimit !== -1 && currValue.length >= Math.max(selectLimit, 1)) return
            setInnerValue((prev) => {
              if (Array.isArray(prev)) {
                return [...new Set([...prev, itemValue])]
              }
              return prev
            })
          }
        }
      }
    } else {
      if (!multiple) {
        if (itemValue === currValue) {
          if (cancelable) {
            onChange(null)
          }
        } 
        else {
          onChange(itemValue)
        }
      } else {
        if (Array.isArray(currValue)) {
          if (currValue.includes(itemValue)) {
            if (cancelable) {
              onChange(currValue.filter(item => item !== itemValue))
            }
          }
          else {
            if (selectLimit !== -1 && currValue.length >= Math.max(selectLimit, 1)) return
            onChange([...new Set([...currValue, itemValue])])
          }
        }
      }
    }
    
  }, [currValue, cancelable, multiple, selectLimit, isControlled, onChange])

  const contextValue = useMemo(() => ({
    value: currValue,
    onChange: onItemChange,
    name: name,
    multiple: multiple,
    checkedIcon: checkedIcon,
    isOnSelectLimit: isOnSelectLimit,
  }), [currValue, onItemChange, name, multiple, isOnSelectLimit, checkedIcon])

  return(
    <CheckBoxContext.Provider value={contextValue}>
      <div
        className={props.className}
        style={props.style}
      >
        { props.children }
      </div>
    </CheckBoxContext.Provider>
  ) 
}

const UCheckBoxItem = memo((props: CheckBoxItemType) => {
  const context =  useContext(CheckBoxContext)
  if (!context) {
    throw new Error('Radio 组件必须在 CheckBox 组件内使用')
  }
  const { value: contextValue, onChange, name, multiple, isOnSelectLimit, checkedIcon } = context

  const isFirstRender = useRef(true)
  useEffect(() => {
    isFirstRender.current = false
  }, [])

  const { merged: _props } = useMergedProps(
    itemDefaultProperties,
    props,
    ['value', 'label', 'disabled', 'readonly']
  )

  const { value, label, disabled, readonly } = _props
  
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
      'u-check-box-item',
      'u-check-box-item'
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
      'u-check-box-box',
      'u-check-box-box'
    )
    return classname
  }, [multiple, isChecked])

  const bgClass = useMemo(() => {
    const classname = genClassNameFromProps(
      { isChecked, unChecked: !isChecked },
      'u-check-box-box-bg',
      'u-check-box-box-bg'
    )
    return classname
  }, [isChecked])

  return(
    <label className={checkBoxClass + ' ' + props.className}>
      {
        !props.labelOnly &&
        <div className={boxClass}>
          <div className={bgClass}>
            {
              (multiple) &&
              <UIcon size='10px'style={{color: 'white',}}type={checkedIcon}/>
            }
          </div>
        </div>
      }
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
          UCheckBoxLabel({ children: props.children }) : 
          UCheckBoxLabel({ children: label })
      }
    </label>
  )
})

UCheckBoxItem.displayName = 'UCheckBoxItem'

const UCheckBoxLabel = (
  props: 
  { 
    children?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties
  }
) => {
  return(
    <div 
      className={`u-checkbox-label ${props.className}`}
      style={{...props.style}}
    >
      { props.children }
    </div>
  )
}

const CheckBox = {
  Group: UCheckBoxGroup,
  Item: UCheckBoxItem,
  Label: UCheckBoxLabel,
}

export default CheckBox
