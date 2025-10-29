import { SwitchType } from "./type.ts"
import './style.less'
import { useEffect, useState } from "react"
import defaultProperties from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { UrpIcon } from '../Icon/index.ts'

export default function UrpSwitch(props: SwitchType) {
  const mergedProps = { ...defaultProperties, ...props }
  const { onStateChange } = mergedProps
  const [state, setState] = useState(mergedProps.state)
  const [loading, setLoading] = useState(mergedProps.loading)

  // 开关总体 className
  const switchClassName = genClassNameFromProps(
    { 
      state: state ? 'open' : 'close',
      shape: mergedProps.shape,
      size: mergedProps.size,
      disabled: mergedProps.loading || mergedProps.disabled
    }, 
    'urp-switch',
    'urp-switch'
  )
  // 滑块 className
  const sliderClassName = genClassNameFromProps(
    { 
      state: state ? 'open' : 'close',
      shape: mergedProps.shape
    }, 
    'urp-switch-slider', 
    'urp-switch-slider'
  )
  // 内部描述信息 className
  const descClassName = genClassNameFromProps(
    {
      state: state ? 'open' : 'close',
    },
    'urp-desc-inner',
    'urp-desc-inner'
  )
  // 外部描述信息 className
  const outterDescClassName = genClassNameFromProps(
    {
      state: state ? 'open' : 'close',
    },
    'urp-desc-outter',
    'urp-desc-outter'
  )

  // HOOK: 外部输入状态变化时，同步到内部状态
  useEffect(() => {
    setState(mergedProps.state)
  }, [mergedProps.state])

  // HOOK: 内部状态变化，把最新的状态传递到外部
  useEffect(() => {
    onStateChange?.(state)
  }, [state, onStateChange])

  useEffect(() => {
    setLoading(mergedProps.loading)
  }, [mergedProps.loading])

  // 状态变化处理函数
  const stateChange = async () => {
    let beforeResult = true

    // 增加对异步函数的处理
    if (mergedProps.beforeStateChange) {
      setLoading(true)
      beforeResult = await new Promise(resolve => {
        setTimeout(() => {
          resolve(mergedProps.beforeStateChange())
        }, 0)    // 0ms 延迟，确保进入下一个事件循环
      })
      setLoading(false)
      beforeResult = Boolean(beforeResult)
    }

    // 判断是否可以改变状态
    const canIChangeState = beforeResult && !mergedProps.disabled && !mergedProps.loading

    // 满足条件则更新状态
    if (canIChangeState) {
      setState(prev => !prev)
    }
  }

  // 描述组件
  const displayDesc = (descPos = 'inner', iconSize = 8) => {
    if (mergedProps.descPos !== descPos) return null
    // 加载状态图标
    if (loading) {
      return (
         <UrpIcon 
          size={iconSize + 2} 
          type='LoadingOutlined'
        />
      )
    }
    // 非加载状态描述
    if (mergedProps.desc.length) {
      return state ? mergedProps.desc[0] : mergedProps.desc[1]
    } else if (mergedProps.descIcon.length) {
      return (
        <UrpIcon 
          size={iconSize} 
          type={state ? mergedProps.descIcon[0] : mergedProps.descIcon[1]}
        />
      )
    }
    return null
  }
  
  // 返回主结构
  return (
    <div onClick={stateChange} className={switchClassName}>
      <div className={sliderClassName}>
        <div className={descClassName}>
          { displayDesc() }
        </div>
      </div>
      <div className={outterDescClassName}>
        { displayDesc('outter', 10) }
      </div>
    </div>
  )
}
