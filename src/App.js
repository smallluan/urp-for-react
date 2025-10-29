import { useState } from "react"
import { UrpSwitch } from "./components/Switch/index.ts"

export default function App() {

  const [state, setState] = useState(false)

  const changeState = (currState) => {
    setState(currState)
  }

  return (
    <div>
      <UrpSwitch state={state} desc={['开', '关']} loading={state} />
      {/* <UrpSwitch disabled={state} /> */}
      <div> ---  </div>
      <UrpSwitch 
        onStateChange={(currState) => changeState(currState)}
        beforeStateChange = {
          () => {
            return window.confirm("确定要切换状态吗？")
          }
        }
        shape="react" 
        state={false}
      />
    </div>
  )
}
