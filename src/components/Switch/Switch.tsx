import { SwitchType } from "./type.ts"
import './style.less'
import { useEffect, useMemo, useState } from "react"
import defaultProperties, { formatProps } from "./properties.ts"
import genClassNameFromProps from "../utils/tools/className.ts"
import { UIcon } from '../Icon/index.ts'

export default function USwitch(props: SwitchType) {
  const _props = formatProps({ ...defaultProperties, ...props })
  // 是否是一个受控开关
  const isControlled = _props.state !== undefined
  // 非受控内部状态
  const [innerState, setInnerState] = useState(() => {
    return _props.defaultState ?? false
  })
  // 当前开关状态
  const currState = isControlled ? _props.state : innerState
  // 内部临时加载状态(执行异步前置校验)
  const [innerLoading, setInnerLoading] = useState(_props.loading)
  // 在优先取父 loading 的同时防止子 loading 被覆盖
  const currLoading = _props.loading !== undefined ? 
                      _props.loading || innerLoading : 
                      innerLoading

  useEffect(() => {
    if (isControlled) {
      setInnerState(_props.state as boolean)
    }
  }, [_props.state, isControlled])

  // 状态变化处理函数
  const stateChange = async () => {
    // 先判断禁用/加载，直接返回
    if (_props.disabled || currLoading) return
    let beforeResult = true

    if (_props.beforeStateChange) {
      setInnerLoading(true)
      // 把异步逻辑放到微任务
      queueMicrotask(async () => {
        try {
          beforeResult = await _props.beforeStateChange()
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
          _props.onStateChange?.(newState)
        } else {
          setInnerState(newState)
          _props.onStateChange?.(newState)
        }
      })
      // 退出当前同步函数，等待微任务执行
      return
    }

    // 没有 beforeStateChange 的情况，正常处理
    const newState = !currState
    if (isControlled) {
      _props.onStateChange?.(newState)
    } else {
      setInnerState(newState)
      _props.onStateChange?.(newState)
    }
  }

  // 开关总体 className
  const switchClassName = useMemo(() => {
    return genClassNameFromProps(
      { 
        state: currState ? 'open' : 'close',
        shape: _props.shape,
        size: _props.size,
        disabled: currLoading || _props.disabled
      }, 
      'u-switch',
      'u-switch'
    )
  }, [currState, _props.shape, _props.size, currLoading, _props.disabled])

  // 滑块 className
  const sliderClassName = useMemo(() => {
    return genClassNameFromProps(
      { 
        state: currState ? 'open' : 'close',
        shape: _props.shape
      }, 
      'u-switch-slider', 
      'u-switch-slider'
    )
  }, [currState, _props.shape]) 

  // 内部描述信息 className
  const descClassName = useMemo(() => {
    return genClassNameFromProps(
      { state: currState ? 'open' : 'close' },
      'u-desc-inner',
      'u-desc-inner'
    )
  }, [currState]) 
  // 外部描述信息 className
  const outerDescClassName = useMemo(() => {
    return genClassNameFromProps(
      { state: currState ? 'open' : 'close' },
      'u-desc-outer',
      'u-desc-outer'
    )
  }, [currState]) 

  // 描述组件
  const displayDesc = (descPos = 'inner', iconSize = 8) => {
    if (_props.descPos !== descPos) return null
    // 加载状态图标
    if (currLoading) {
      return (
         <UIcon 
          size={iconSize + 2} 
          type='LoadingOutlined'
        />
      )
    }
    // 非加载状态描述
    if (_props.desc.length) {
      return currState ? _props.desc[0] : _props.desc[1]
    } else if (_props.descIcon.length) {
      return (
        <UIcon 
          size={iconSize} 
          type={currState ? _props.descIcon[0] : _props.descIcon[1]}
        />
      )
    }
    return null
  }
  
  // 返回主结构
  return (
    <div data-testid="u-switch"  onClick={stateChange} className={switchClassName}>
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
