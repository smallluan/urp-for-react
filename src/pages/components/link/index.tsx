import { UrpLink } from "../../../components/Link/index.ts"

export default function LinkPage() {
  return(
    <div>
      <h2>Link 组件</h2>
      <h3>尺寸</h3>
      <UrpLink content="跳转链接" size="normal" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" size="small" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" size="large" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <h3>下划线</h3>
      <UrpLink content="跳转链接" underline="none" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" underline="display" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" underline="hover" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <h3>图标</h3>
      <UrpLink content="跳转链接" prefixIcon="LinkOutlined" theme="default" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" prefixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" prefixIcon="LinkOutlined" theme="warning" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" prefixIcon="LinkOutlined" theme="success" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" prefixIcon="LinkOutlined" theme="error" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" suffixIcon="LinkOutlined" theme="default" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" suffixIcon="LinkOutlined" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" suffixIcon="LinkOutlined" theme="warning" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" suffixIcon="LinkOutlined" theme="success" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" suffixIcon="LinkOutlined" theme="error" href="https://tdesign.tencent.com/"/>
      <hr/>
      <h3>默认渲染</h3>
      <UrpLink content="跳转链接" theme="default" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" theme="primary" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" theme="warning" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" theme="success" href="https://tdesign.tencent.com/"/>
      <hr/>
      <UrpLink content="跳转链接" theme="error" href="https://tdesign.tencent.com/"/>
      <hr/>
    </div>
  )
}