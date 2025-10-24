import { UrpDivider } from './components/Divider/index.ts'
export default function App() {
  return (
    <div>
      <UrpDivider/>
      <UrpDivider dashed />
      <UrpDivider>就此分别</UrpDivider>
      <UrpDivider dashed align='left'>就此分别</UrpDivider>
      <UrpDivider align='right'>就此分别</UrpDivider>
      <UrpDivider layout='vertical'>
        <div>富强</div>
        <div>民主</div>
        <div>文明</div>
        <div>和谐</div>
      </UrpDivider>
      <UrpDivider layout='vertical' dashed>
        <div>自由</div>
        <div>平等</div>
        <div>公正</div>
        <div>法治</div>
      </UrpDivider>
      <UrpDivider layout='vertical' dashed space='8px' slope>
        <div>爱国</div>
        <div>敬业</div>
        <div>诚信</div>
        <div>友善</div>
      </UrpDivider>
      <UrpDivider>
        <div>自由</div>
        <div>平等</div>
        <div>博爱</div>
      </UrpDivider>
    </div>
  )
}
