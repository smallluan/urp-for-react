import { SwitchType } from "./type.ts"
import './style.less'
import { useEffect, useMemo, useState } from "react"
import defaultProperties, { formatProps } from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { UrpIcon } from '../Icon/index.ts'

export default function UrpSwitch(props: SwitchType) {
  const mergedProps = formatProps({ ...defaultProperties, ...props })
  // 是否是一个受控开关
  const isControlled = mergedProps.state !== undefined
  // 非受控内部状态
  const [innerState, setInnerState] = useState(() => {
    return mergedProps.defaultState ?? false
  })
  // 当前开关状态
  const currState = isControlled ? mergedProps.state : innerState
  // 内部临时加载状态(执行异步前置校验)
  const [innerLoading, setInnerLoading] = useState(mergedProps.loading)
  // 在优先取父 loading 的同时防止子 loading 被覆盖
  const currLoading = mergedProps.loading !== undefined ? 
                      mergedProps.loading || innerLoading : 
                      innerLoading

  useEffect(() => {
    if (isControlled) {
      setInnerState(mergedProps.state as boolean)
    }
  }, [mergedProps.state, isControlled])

  // 状态变化处理函数
  const stateChange = async () => {
    // 先判断禁用/加载，直接返回
    if (mergedProps.disabled || currLoading) return
    let beforeResult = true

    if (mergedProps.beforeStateChange) {
      setInnerLoading(true)
      // 把异步逻辑放到微任务
      queueMicrotask(async () => {
        try {
          beforeResult = await mergedProps.beforeStateChange()
          beforeResult = Boolean(beforeResult)
        } catch (e) {
          beforeResult = false
          console.error('beforeStateChange 执行失败：', e)
        } finally {
          setInnerLoading(false)
        }

        if (!beforeResult) return
        const newState = !currState
        if (isControlled) {
          mergedProps.onStateChange?.(newState)
        } else {
          setInnerState(newState)
          mergedProps.onStateChange?.(newState)
        }
      })
      // 退出当前同步函数，等待微任务执行
      return
    }

    // 没有 beforeStateChange 的情况，正常处理
    const newState = !currState
    if (isControlled) {
      mergedProps.onStateChange?.(newState)
    } else {
      setInnerState(newState)
      mergedProps.onStateChange?.(newState)
    }
  }

  // 开关总体 className
  const switchClassName = useMemo(() => {
    return genClassNameFromProps(
      { 
        state: currState ? 'open' : 'close',
        shape: mergedProps.shape,
        size: mergedProps.size,
        disabled: currLoading || mergedProps.disabled
      }, 
      'urp-switch',
      'urp-switch'
    )
  }, [currState, mergedProps.shape, mergedProps.size, currLoading, mergedProps.disabled])

  // 滑块 className
  const sliderClassName = useMemo(() => {
    return genClassNameFromProps(
      { 
        state: currState ? 'open' : 'close',
        shape: mergedProps.shape
      }, 
      'urp-switch-slider', 
      'urp-switch-slider'
    )
  }, [currState, mergedProps.shape]) 

  // 内部描述信息 className
  const descClassName = useMemo(() => {
    return genClassNameFromProps(
      { state: currState ? 'open' : 'close' },
      'urp-desc-inner',
      'urp-desc-inner'
    )
  }, [currState]) 
  // 外部描述信息 className
  const outerDescClassName = useMemo(() => {
    return genClassNameFromProps(
      { state: currState ? 'open' : 'close' },
      'urp-desc-outer',
      'urp-desc-outer'
    )
  }, [currState]) 

  // 描述组件
  const displayDesc = (descPos = 'inner', iconSize = 8) => {
    if (mergedProps.descPos !== descPos) return null
    // 加载状态图标
    if (currLoading) {
      return (
         <UrpIcon 
          size={iconSize + 2} 
          type='LoadingOutlined'
        />
      )
    }
    // 非加载状态描述
    if (mergedProps.desc.length) {
      return currState ? mergedProps.desc[0] : mergedProps.desc[1]
    } else if (mergedProps.descIcon.length) {
      return (
        <UrpIcon 
          size={iconSize} 
          type={currState ? mergedProps.descIcon[0] : mergedProps.descIcon[1]}
        />
      )
    }
    return null
  }
  
  // 返回主结构
  return (
    <div data-testid="urp-switch"  onClick={stateChange} className={switchClassName}>
      <div className={sliderClassName}>
        <div className={descClassName}>
          { displayDesc() }
        </div>
      </div>
      <div className={outerDescClassName}>
        { displayDesc('outer', 10) }
      </div>
    </div>
  )
}
