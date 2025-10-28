import { UrpSwitch } from "./components/Switch/index.ts"

export default function App() {
  return (
    <div>
      <UrpSwitch loading state={false} />
      <div> ---  </div>
      <UrpSwitch shape="react" state={false} />
    </div>
  )
}