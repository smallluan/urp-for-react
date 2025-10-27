import { UrpSwitch } from "./components/Switch/index.ts"

export default function App() {

  function switchStateChange(newState) {
    console.log('我是外部组件接收到的值', newState)
  }

  return (
    <div>
      <UrpSwitch onStateChange={(newState) => switchStateChange(newState)} state={false} />
      <div> ---  </div>
      <UrpSwitch shape="react" onStateChange={(newState) => switchStateChange(newState)} state={false} />
    </div>
  )
}
