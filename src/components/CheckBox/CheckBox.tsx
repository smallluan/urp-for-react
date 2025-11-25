import { createContext, useContext, useState } from 'react'
import './style.less'

const CheckBoxContext = createContext<{
  value: string;
  name: string;
  onChange: (value: any) => void;
} | undefined>(undefined)

const CheckBox = (
  {value, label, name, children, onChange}: 
  {
    value: string;
    label: string;
    name: string;
    children: React.ReactNode[];
    onChange: (value: string) => void;
  }
) => {
  const [currValue, setCurrValue] = useState(value)
  const onItemChange = (itemValue: any) => {
    setCurrValue(itemValue.value)
    onChange(itemValue)
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
     <CheckBoxRadioItem 
      value={value} 
      label={label} 
    />
  )
}

const CheckBoxRadioItem = (
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
      <div className={`urp-radio-${isChecked ? 'checked' : 'unchecked'}`}/>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={() => onChange({name, value})}
      />
      <span className="radio-text">{label}</span>
    </label>
  )
}

CheckBox.Item = CheckBoxItem

export default CheckBox
