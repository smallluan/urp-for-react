import { UrpDivider } from '../../../components/Divider/index.ts'
import { Layout } from '../../../components/utils/types/index.ts'

export default function DividerPage() {
  return (
    <div>
      <h2>Divider 组件</h2>
      <UrpDivider />

      <UrpDivider dashed />

      <UrpDivider>分割线</UrpDivider>

      <UrpDivider align='left'>分割线</UrpDivider>

      <UrpDivider dashed align='right'>分割线</UrpDivider>

      <UrpDivider layout={Layout.VERTICAL}>
        <div>富强</div>
        <div>民主</div>
        <div>文明</div>
        <div>和谐</div>
      </UrpDivider>

      <UrpDivider layout={Layout.VERTICAL} dashed>
        <div>自由</div>
        <div>平等</div>
        <div>公正</div>
        <div>法治</div>
      </UrpDivider>

      <UrpDivider layout={Layout.VERTICAL} dashed space='8px' slope>
        <div>爱国</div>
        <div>敬业</div>
        <div>诚信</div>
        <div>友善</div>
      </UrpDivider>

      <UrpDivider>
        <div>富强</div>
        <div>民主</div>
        <div>文明</div>
        <div>和谐</div>
      </UrpDivider>
    </div>
  )
}
