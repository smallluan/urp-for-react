import { Tabs, TabsPanel } from "./type"
import { defaultTabsProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import useExtractChildrenByType from "../utils/hooks/useExtractChildrenByType.ts"
import { useEffect, useRef, useState } from "react"
import { USpace } from "../Space/index.ts"
import classNames from "classnames"

import "./style.less"

const UTab = (props: Tabs) => {
  // 获取合并树形
  const { merged: _props } = useMergedProps(
    defaultTabsProps,
    props,
    [
      'className', 'style', 'children', 'theme',
      'value', 'defaultValue', 'onChange'
    ]
  )

  // 是否为受控组件
  const [innerValue, setInnerValue] = useState(_props.defaultValue ?? 0)
  const isControld = _props.value !== undefined
  const finalValue = isControld ? _props.value : innerValue

  // 获取合法子元素
  const panelChilren = useExtractChildrenByType<TabsPanel>(_props.children, UTabPanel)

  // 存储每个 tab 的 DOM 元素引用
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  // 存储动态获取的激活 tab 宽度
  const [curseStyle, setCurseStyle] = useState({
    width: 0,
    left: 0
  })

  // 监听 tab 切换事件，动态获取激活的 tab 宽度和 left
  useEffect(() => {
    // 无合法面板元素，重置光标样式
    if (panelChilren.length === 0) {
      setCurseStyle({ width: 0, left: 0 })
      return
    }

    // 找到激活 tab 在 panelChildren 中的索引
    const activeIndex = panelChilren.findIndex(child => child.props.value === finalValue)

    // 未找到激活 tab 或者对应的 dom 没有挂载，重置光标宽度
    if (activeIndex === -1 || !tabRefs.current[activeIndex]) {
      setCurseStyle({ width: 0, left: 0 })
      return
    }

    // 拿到激活的 tab 对应的 dom，取宽度和 left
    const activeTabDom = tabRefs.current[activeIndex]
    const tabWidth = activeTabDom.offsetWidth
    const tabLeft = activeTabDom.offsetLeft

    // 更新光标样式
    setCurseStyle({
      width: tabWidth,
      left: tabLeft
    })
  }, [finalValue, panelChilren])

  /**
   * 响应 tab 切换
   * @param value - 被点击的 tab
   */
  const handleTabClick = (value: number | string) => {
    if (value === finalValue) return

    if (isControld) {
      _props.onChange?.(value)
    } else {
      setInnerValue(value)
    }
  }

  // 渲染 tab
  const renderTab = () => {
    return panelChilren.map((child, index) => {
      const { label, value } = child.props

      return (
        <div
          key={value}
          ref={(el) => { tabRefs.current[index] = el }}
          className={classNames(
            "u-tab",
            {"u-tab-active": finalValue === value}
          )}
          onClick={() => handleTabClick(value)}
        >
          <div>{label}</div>
        </div>
      )
    })
  }

  // 渲染 panel 
  const renderPanel = () => {
    const targetChild = panelChilren.find(child => child.props.value === finalValue)
    return targetChild || null
  }

  return (
    <div
      className={_props.className}
      style={_props.style}
    >
      <USpace gap={16} className="u-tabs">
        {renderTab()}
        <div
          style={{
            width: `${curseStyle.width}px`,
            left: `${curseStyle.left}px`
          }}
          className="u-tabs-curse"
        />
      </USpace>
      {renderPanel()}
    </div>
  )
}

const UTabPanel = (props: TabsPanel) => {
  return (
    <div
      className={props.className}
      style={props.style}
    >
      {props.children || props.content}
    </div>
  )
}

UTab.Panel = UTabPanel
export default UTab
