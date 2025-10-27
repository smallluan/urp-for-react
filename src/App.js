import { UrpSwitch } from "./components/Switch/index.ts"

export default function App() {

  function switchStateChange(newState) {
    console.log('我是外部组件接收到的值', newState)
  }

  return (
    <div>
      <UrpSwitch onStateChange={(newState) => switchStateChange(newState)} state={true} />
      <div> ---  </div>
      <UrpSwitch shape="react" onStateChange={(newState) => switchStateChange(newState)} state={false} />
      <div> ---  </div>
      <UrpSwitch desc={['开', '关']} onStateChange={(newState) => switchStateChange(newState)} state={false} />
      <div> ---  </div>
      <UrpSwitch descIcon={['CheckOutlined', 'CloseOutlined']} onStateChange={(newState) => switchStateChange(newState)} state={false} />
      <div> ---  </div>
      <UrpSwitch descPos="outter" desc={['开', '关']} onStateChange={(newState) => switchStateChange(newState)} state={false} />
      <div> ---  </div>
      <UrpSwitch size="small" descPos="outter" descIcon={['CheckOutlined', 'CloseOutlined']} onStateChange={(newState) => switchStateChange(newState)} state={false} />
        <div> ---  </div>
      <UrpSwitch size="small" onStateChange={(newState) => switchStateChange(newState)} state={false} />
      <div> ---  </div>
      <UrpSwitch size="large" onStateChange={(newState) => switchStateChange(newState)} state={false} />
    </div>
  )
}