import { UrpLink } from "../../../components/Link/index.ts"

export default function LinkPage() {
  return(
    <div>
      <h2>Link 组件</h2>
      <h3>尺寸</h3>
      <UrpLink size="normal" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink size="small" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink size="large" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <h3>下划线</h3>
      <UrpLink underline="none" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink underline="display" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink underline="hover" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <h3>图标</h3>
      <UrpLink prefixIcon="LinkOutlined" theme="default" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink prefixIcon="LinkOutlined" theme="warning" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink prefixIcon="LinkOutlined" theme="success" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink prefixIcon="LinkOutlined" theme="error" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink suffixIcon="LinkOutlined" theme="default" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink suffixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink suffixIcon="LinkOutlined" theme="warning" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink suffixIcon="LinkOutlined" theme="success" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink suffixIcon="LinkOutlined" theme="error" href="https://tdesign.tencent.com/"/>
      <hr/>
      <h3>默认渲染</h3>
      <UrpLink theme="default" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink theme="warning" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink theme="success" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink theme="error" href="https://tdesign.tencent.com/"/>
      <hr/>
    </div>
  )
}