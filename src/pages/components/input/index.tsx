import { UrpInput } from '../../../components/Input/index.ts'

export default function InputPage() {
  return(
    <>
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
