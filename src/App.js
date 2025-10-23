import { Divider } from './components/Divider/index.ts'
export default function App() {
  return (
    <div>
      <Divider/>
      <Divider dashed />
      <hr style={{ color: 'red' }} />
      {/* <Divider></Divider> */}
      <Divider>就此分别</Divider>
      <Divider align='left'>就此分别</Divider>
      <Divider>就此分别</Divider>
      <Divider layout='vertical'>
        <div>富强</div>
        <div>民主</div>
        <div>文明</div>
        <div>和谐</div>
      </Divider>
      <Divider layout='vertical' dashed>
        <div>自由</div>
        <div>平等</div>
        <div>公正</div>
        <div>法治</div>
      </Divider>
      <Divider layout='vertical' space='4px' slope>
        <div>爱国</div>
        <div>敬业</div>
        <div>诚信</div>
        <div>友善</div>
      </Divider>
      <Divider>
        <div>富强</div>
        <div>民主</div>
        <div>文明</div>
        <div>和谐</div>
      </Divider>
    </div>
  )
}
