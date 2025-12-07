import { Select } from "./type"
import genClassNameFromProps from "../utils/tools/className.ts"

import { UrpIcon } from "../Icon/index.ts"
import { UrpPopup } from "../Popup/index.ts"
import { UrpCheckBox } from "../CheckBox/index.ts"
import { UrpSpace } from "../Space/index.ts"
import { UrpButton } from "../Button/index.ts"
import { UrpGrid } from "../Grid/index.ts"

import "./style.less"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

const SelectContext = createContext(undefined)

const UrpSelect = (props: Select) => {

  const [mouseEnter, setMouseEnter] = useState(false)
  const [mouseFocus, setMouseFocus] = useState(false)
  const hasBindClickRef = useRef(false)
  const selectRef = useRef(null)

  useEffect(() => {
    if (hasBindClickRef.current) return
    hasBindClickRef.current = true

    const handleWindowClick = (e) => {
      if (
        selectRef.current && 
        !selectRef.current.contains(e.target)
      ) {
        setMouseFocus(false)
      }
    }
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick)
      hasBindClickRef.current = false
    }
  }, [])

  const selectClass = useMemo(() => {
    return genClassNameFromProps(
      {
        hover: mouseEnter,
        focus: mouseFocus
      },
      'urp-select',
      'urp-select'
    )
  }, [mouseFocus, mouseEnter])



  const setFoucsState = useCallback(() => {
    setMouseFocus(!mouseFocus)
  }, [mouseFocus])

  const contextValue = useMemo(() => ({
    options: props.options,
    defaultValue: props.defaultValue,
    value: props.value,
    mouseFocus: mouseFocus,
    onChange: props.onChange,
    setMouseFocus: setMouseFocus,
  }), [props.options, props.defaultValue, props.value, props.onChange, mouseFocus])

  return(
    <SelectContext.Provider value={contextValue}>
      <div
        ref={selectRef}
      >
        <UrpPopup
          trigger="click"
        >
          <div
            className={selectClass}
            tabIndex={0}
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            onClick={setFoucsState}
          >
            <div className="">
              {
                props.options.find(item => item.value === props.value)?.label || ''
              }
            </div>
            <Icons/>
          </div>
          <UrpPopup.Content
            position="bottom"
            visible={mouseFocus}
            className="urp-select-pop-content"
            arrow
          >
            <div style={{ width: '100%' }}>
              <UrpSpace direction="vertial" gap={8}>
                <Options/>
                <Footer/> 
              </UrpSpace>
            </div>
          </UrpPopup.Content>
        </UrpPopup>
      </div>
    </SelectContext.Provider>
  )
}

/**
 * 选项组件
 */
const Options = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("Select 组件中 Options 未获取上下文数据")
  }

  return (
    <UrpCheckBox.Group 
      onChange={(newValue) => {
        context.setMouseFocus(false)
        context.onChange(newValue)
      }} 
      cancelable 
      defaultValue={context.defaultValue}
      value={context.value}
      style={{width: '100%'}}
    >
      {
        context.options.map((item) => (
          <UrpSpace key={item.value} direction="vertial" gap={4}>
            <UrpCheckBox.Item className="check-box" value={item.value}>
              <UrpCheckBox.Label className="check-box-label">{item.label}</UrpCheckBox.Label>
            </UrpCheckBox.Item>
          </UrpSpace>
        ))
      }
    </UrpCheckBox.Group>
  )
}

/**
 * 图标组件
 */
const Icons = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("Select 组件中 Icons 未获取上下文数据")
  }
  const arrowIconClass = useMemo(() => {
    return genClassNameFromProps(
      {
        down: !context.mouseFocus,
        up: context.mouseFocus,
      },
      'urp-select-icon-arrow',
      'urp-select-icon-arrow'
    )
  }, [context.mouseFocus])
  return(
    <UrpSpace
      className="urp-select-icons"
      gap={4}
    >
      <UrpIcon
        className={arrowIconClass}
        type="DownOutlined"
      />
    </UrpSpace>
  )
}

/**
 * 底部组件
 */
const Footer = () => {
  return (
    <UrpGrid.Row justify="end">
      <UrpGrid.Col span={24}>
        <UrpSpace direction="horizontal" gap={8}>
          <UrpButton content="取消" theme="default" size="small" />
          <UrpButton content="确定" size="small" />
        </UrpSpace>
      </UrpGrid.Col>
    </UrpGrid.Row>
  )
}

export default UrpSelect
