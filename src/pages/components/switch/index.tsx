import { useState } from 'react'
import { UrpSwitch } from '../../../components/Switch/index.ts'

export default function SwitchPage() {
  const [switchState, setSwitchState] = useState(false)
  return(
    <div>
      <h2>Switch 组件</h2>
      <h2>异步前置校验</h2>
      <UrpSwitch 
        onStateChange={(newState) => {
          setSwitchState(newState)
        }} 
        state={switchState}
        beforeStateChange={() => {
          return new Promise((rsolve, reject) => {
            setTimeout(() => {
            rsolve(true)
          }, 3000)
          })
        }}
      />
      <h2>前置校验</h2>
       <UrpSwitch 
        defaultState={false} 
        beforeStateChange={() => false}
      />
      <h2>描述图标</h2>
      <UrpSwitch 
        descIcon={['CheckOutlined', 'CloseOutlined']}
      />
      <UrpSwitch 
        descIcon={['CheckOutlined', 'CloseOutlined']}
        descPos="outer"
      />
      <h2>描述文字</h2>
      <UrpSwitch 
        desc={['开', '关']}
      />
      <UrpSwitch 
        desc={['开', '关']}
        descPos="outer"
      />
      <h2>加载状态</h2>
      <UrpSwitch 
        defaultState={false}
        loading
      />
      <h2>禁用状态</h2>
      <UrpSwitch 
        defaultState={false}
        disabled
      />
      <h2>方形开关</h2>
      <UrpSwitch 
        shape='rect'
      />
      <h2>尺寸</h2>
      <UrpSwitch 
        size="large"
      />
      <UrpSwitch 
        size="normal"
      />
      <UrpSwitch 
        size="small"
      />
      <h2>非受控开关</h2>
      <UrpSwitch 
        defaultState={false} 
      />
      <h2>受控开关</h2>
      <UrpSwitch 
        onStateChange={(newState) => {
          setSwitchState(newState)
        }} 
        state={switchState}
      />
    </div>
  )
}
