import { UrpButton } from "./components/Button/index.ts"

export default function App() {

  return (
    <div>
      <h3>主题</h3>
      <UrpButton theme="default">确定</UrpButton>
      <hr/>
      <UrpButton theme="primary">确定</UrpButton>
      <hr/>
      <UrpButton theme="warning">确定</UrpButton>
      <hr/>
      <UrpButton theme="success">确定</UrpButton>
      <hr/>
      <UrpButton theme="error">确定</UrpButton>
      <hr/> 
      <UrpButton size="large">确定</UrpButton>
      <hr/>
      <UrpButton size="small">确定</UrpButton>
      <hr/>
      <UrpButton shape="round">确定</UrpButton>
      <hr/>
      <UrpButton>确定</UrpButton>
      <hr/>
    </div>
  )
}
