import React, { cloneElement, createContext, isValidElement, useCallback, useContext, useMemo, useState } from "react"
import "./style.less"
import genStyleFromProps from "../utils/tools/style.ts"
import genClassNameFromProps from "../utils/tools/className.ts"


const AnchorContext = createContext(undefined)


const UAnchor = (props) => {

  const [currAnchor, setCurrAnchor] = useState(0)

  const renderValidChildren = () => {
    const childrenArray = React.Children.toArray(props.children)
    const anchorItems = childrenArray.filter(child => (
      isValidElement(child) && child.type === Item 
    ))
    return anchorItems.map((child, index) => (
      cloneElement(child, {
        key: child.key || `item-${index}`,
        anchorIndex: index,
        ...child.props
      })
    ))
  }

  const handleClick = useCallback((newAnchor) => {
    setCurrAnchor(newAnchor)
    console.log(newAnchor, currAnchor)
  })

  const contextValue = {
    handleClick: handleClick,
    currAnchor: currAnchor
  }

  const anchorStyle = useMemo(() => {
    const childrenLenght = renderValidChildren().length
    return genStyleFromProps({
      cursorHeight: (100 * 0.6 / childrenLenght).toFixed(2) + '%',
      cursorOffset: '20%',
      marginTop: (100 * currAnchor / childrenLenght).toFixed(2) + '%'
    })
  })

  return (
    <AnchorContext.Provider value={contextValue}>
      <div style={anchorStyle} className={"u-anchor " + props.className}>
        <div className="u-anchor-line">
          <div className="u-anchor-line-cursor"></div>
        </div>
        <div>
          {renderValidChildren()}
        </div>
      </div>
    </AnchorContext.Provider>
  )
}

const Item = (props) => {

  const context = useContext(AnchorContext)
  if (!context) {
    throw new Error('UAnchor.Item 组件仅能在 UAnchor 组件中使用！')
  }


  const handleClick = useCallback((e) => {
    // 阻止原生 a 标签的默认跳转行为
    e?.preventDefault()
    
    // 处理 href 可能带 # 的情况，提取纯 id
    const targetId = props.href.replace(/^#/, '')
    if (!targetId) return

    // 查找目标元素
    const target = document.getElementById(targetId)
    if (!target) {
      console.warn(`锚点元素 ${targetId} 不存在`)
      return
    }

    const targetTop = target.getBoundingClientRect().top + window.scrollY 

    // 滚动到目标位置（平滑滚动）
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    })

    // 调用 context 的 handleClick
    context.handleClick(props.anchorIndex)
  }, [props.href])

  const itemClass = useMemo(() => {
    return genClassNameFromProps(
    {
      active: context.currAnchor === props.anchorIndex
    },
    "u-anchor-item",
    "u-anchor-item"
  )
  }, [context.currAnchor, props.anchorIndex])

  return (
    <a
      href={props.href}
      onClick={handleClick}
      className={itemClass}
    >
      {props.children}
    </a>
  )
}

const Target = (props) => {
  return (
    <div id={props.id}>
      {props.children}
    </div>
  )
}

UAnchor.Item = Item
UAnchor.Target = Target

export default UAnchor
