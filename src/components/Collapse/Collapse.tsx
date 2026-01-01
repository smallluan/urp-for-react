import { Collapse } from "./type"
import { Panel } from "./components/Panel/type"
import { UPanel } from "./components/Panel/index.ts"
import "./style.less"
import React, { cloneElement, isValidElement, ReactElement, useState } from "react"

const UCollapse = (props: Collapse) => {

  const [innerValue, setInnerValue] = useState(() => {
    return props.defaultValue ?? []
  })

  const handleValueChange = (value, state) => {
    let valueArr = props.value || innerValue

    if (state) {
      valueArr.push(value)
    } else {
      valueArr = valueArr.filter(item => item !== value)
    }

    props.onChange?.(valueArr)
    setInnerValue(valueArr)
  }

  const renderPanel = () => {
    const childrenArray = React.Children.toArray(props.children)
    const panelItems = childrenArray.filter(child => (
      isValidElement(child) && child.type === UPanel
    )) as ReactElement<Panel>[]

    return panelItems.map((child, index) => (
      cloneElement(child, {
        key: child.props.value || index,
        value: index,
        borderless: props.borderless,
        disabled: props.disabled,
        defaultExpand: props.defaultExpandAll || props.defaultValue?.includes(child.props.value || index),
        expand: props.value?.includes(child.props.value || index),
        onChange: handleValueChange,
        ...child.props,
      })
    ))
  }

  return (
    <div className="u-collapse">
      {renderPanel()}
    </div>
  )
}

UCollapse.Panel = UPanel

export default UCollapse
