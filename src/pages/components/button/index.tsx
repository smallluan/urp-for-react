import { UrpButton } from "../../../components/Button/index.ts"

import { useState } from "react"

export default function ButtonPage() {
  const [loading, setLoading] = useState(false)

  const btnClick = (e) => {
    console.log(e)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  return (
    <>
      <h2>Button 组件</h2>
      <h3>图标</h3>
      <UrpButton onClick={btnClick} icon="AppstoreAddOutlined" theme="default">确定</UrpButton>
      <hr />
      <UrpButton loading={loading} icon="AppstoreAddOutlined" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton icon="AppstoreAddOutlined" variant="outline" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton icon="AppstoreAddOutlined" variant="dashed" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton icon="AppstoreAddOutlined" variant="text" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton icon="AppstoreAddOutlined" disabled variant="text" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton icon="AppstoreAddOutlined" block>确定</UrpButton>
      <h3>禁用</h3>
      <UrpButton disabled variant="text" theme="default">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="text" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="text" theme="warning">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="text" theme="success">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="text" theme="error">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="text" size="large">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="text" size="small">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="text" shape="round">确定</UrpButton>
      <hr />
      <UrpButton block>确定</UrpButton>
      <hr />
      <UrpButton disabled theme="default">确定</UrpButton>
      <hr />
      <UrpButton disabled theme="primary">确定</UrpButton>
      <hr />
      <UrpButton disabled theme="warning">确定</UrpButton>
      <hr />
      <UrpButton disabled theme="success">确定</UrpButton>
      <hr />
      <UrpButton disabled theme="error">确定</UrpButton>
      <hr />
      <UrpButton disabled size="large">确定</UrpButton>
      <hr />
      <UrpButton disabled size="small">确定</UrpButton>
      <hr />
      <UrpButton disabled shape="round">确定</UrpButton>
      <hr />
      <UrpButton block>确定</UrpButton>
      <hr />
      <UrpButton disabled variant="dashed" theme="default">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="dashed" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="dashed" theme="warning">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="dashed" theme="success">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="dashed" theme="error">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="dashed" size="large">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="dashed" size="small">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="dashed" shape="round">确定</UrpButton>
      <hr />
      <UrpButton block>确定</UrpButton>
      <hr />
      <UrpButton disabled variant="outline" theme="default">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="outline" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="outline" theme="warning">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="outline" theme="success">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="outline" theme="error">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="outline" size="large">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="outline" size="small">确定</UrpButton>
      <hr />
      <UrpButton disabled variant="outline" shape="round">确定</UrpButton>
      <hr />
      <UrpButton block>确定</UrpButton>
      <h3>文字</h3>
      <UrpButton variant="text" theme="default">确定</UrpButton>
      <hr />
      <UrpButton variant="text" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton variant="text" theme="warning">确定</UrpButton>
      <hr />
      <UrpButton variant="text" theme="success">确定</UrpButton>
      <hr />
      <UrpButton variant="text" theme="error">确定</UrpButton>
      <hr />
      <UrpButton variant="text" size="large">确定</UrpButton>
      <hr />
      <UrpButton variant="text" size="small">确定</UrpButton>
      <hr />
      <UrpButton variant="text" shape="round">确定</UrpButton>
      <hr />
      <UrpButton block>确定</UrpButton>
      <h3>虚线</h3>
      <UrpButton variant="dashed" theme="default">确定</UrpButton>
      <hr />
      <UrpButton variant="dashed" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton variant="dashed" theme="warning">确定</UrpButton>
      <hr />
      <UrpButton variant="dashed" theme="success">确定</UrpButton>
      <hr />
      <UrpButton variant="dashed" theme="error">确定</UrpButton>
      <hr />
      <UrpButton variant="dashed" size="large">确定</UrpButton>
      <hr />
      <UrpButton variant="dashed" size="small">确定</UrpButton>
      <hr />
      <UrpButton variant="dashed" shape="round">确定</UrpButton>
      <hr />
      <UrpButton block>确定</UrpButton>
      <h3>描边</h3>
      <UrpButton variant="outline" theme="default">确定</UrpButton>
      <hr />
      <UrpButton variant="outline" theme="primary">确定</UrpButton>
      <hr />
      <UrpButton variant="outline" theme="warning">确定</UrpButton>
      <hr />
      <UrpButton variant="outline" theme="success">确定</UrpButton>
      <hr />
      <UrpButton variant="outline" theme="error">确定</UrpButton>
      <hr />
      <UrpButton variant="outline" size="large">确定</UrpButton>
      <hr />
      <UrpButton variant="outline" size="small">确定</UrpButton>
      <hr />
      <UrpButton variant="outline" shape="round">确定</UrpButton>
      <hr />
      <UrpButton block>确定</UrpButton>
      <h3>主题</h3>
      <UrpButton theme="default">确定</UrpButton>
      <hr />
      <UrpButton theme="primary">确定</UrpButton>
      <hr />
      <UrpButton theme="warning">确定</UrpButton>
      <hr />
      <UrpButton theme="success">确定</UrpButton>
      <hr />
      <UrpButton theme="error">确定</UrpButton>
      <hr />
      <UrpButton size="large">确定</UrpButton>
      <hr />
      <UrpButton size="small">确定</UrpButton>
      <hr />
      <UrpButton shape="round">确定</UrpButton>
      <hr />
      <UrpButton block>确定</UrpButton>
      <hr />
    </>
  )
}