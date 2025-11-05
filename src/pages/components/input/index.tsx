import { UrpInput } from '../../../components/Input/index.ts'

export default function InputPage() {
  return(
    <>
      <h2>类型</h2>
      <UrpInput placeholder='text' type='text' />
      <UrpInput placeholder='number' type='number' />
      <UrpInput placeholder='url' type='url' />
      <UrpInput placeholder='tel' type='tel' />
      <UrpInput placeholder='password' type='password' />
      <h2>禁用</h2>
      <UrpInput disabled />
      <h2>形状</h2>
      <UrpInput shape='round' size='normal' />
      <UrpInput shape='round' size='small' />
      <UrpInput shape='round' size='large' />
      <h2>尺寸</h2>
      <UrpInput size='normal' />
      <UrpInput size='small' />
      <UrpInput size='large' />
    </>
  )
}
