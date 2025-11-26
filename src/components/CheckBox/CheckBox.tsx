import { createContext, useContext, useState } from 'react'
import './style.less'

const CheckBoxContext = createContext<{
  value: string | null;
  name: string;
  onChange: (value: any) => void;
} | undefined>(undefined)

const UrpCheckBoxGroup = (
  {value, label, name, children, onChange}: 
  {
    value: string;
    label: string;
    name: string;
    children: React.ReactNode[];
    onChange: (value: any) => void;
  }
) => {
  const [currValue, setCurrValue] = useState<string | null>(value)
  const onItemChange = (itemValue: any) => {
    if (itemValue === currValue) {
      setCurrValue(null)
      onChange(null)
    } else {
      setCurrValue(itemValue)
      onChange(itemValue)
    }
  }
  return(
    <CheckBoxContext.Provider value={{ value: currValue, onChange: onItemChange, name }}>
      <div>
        {
          children.map((child, index: number) => {
            return child
          })
        }
      </div>
    </CheckBoxContext.Provider>
  ) 
}

const CheckBoxItem = (
  { value, label }:
  {
    value: string;
    label: string;
  }
) => {
  return(
     <CheckBoxItem 
      value={value} 
      label={label} 
    />
  )
}

const UrpCheckBoxItem = (
  { value, label}:
  {
    value: string;
    label: string;
  }
) => {
  const context =  useContext(CheckBoxContext)

  if (!context) {
    throw new Error('Radio 组件必须在 RadioGroup 组件内使用')
  }

  const { value: contextValue, onChange, name } = context

  const isChecked = contextValue === value

  return(
    <label className="urp-radio-item">
      <div className={`urp-radio urp-radio-${isChecked ? 'checked' : 'unchecked'}`}/>
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={() => onChange(value)}
        checked={isChecked}
      />
      <span className="radio-text">{label}</span>
    </label>
  )
}

const CheckBox = {
  Group: UrpCheckBoxGroup,
  Item: UrpCheckBoxItem
}

export default CheckBox