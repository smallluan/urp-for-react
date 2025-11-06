import { UrpInput } from '../../../components/Input/index.ts'
import { UrpIcon } from '../../../components/Icon/index.ts'

export default function InputPage() {
  return(
    <>
      <h2>只读和禁用</h2>
      <UrpInput 
        description='这里是描述信息' 
        maxlength={10} 
        showCount
        clearable
        readonly
        value='你好，世界'
      >
        <UrpIcon type="AppstoreAddOutlined" />
      </UrpInput> 
      <hr />
      <UrpInput 
        description='这里是描述信息' 
        maxlength={10} 
        showCount
        clearable
        disabled
        value='你好，世界'
      >
        <UrpIcon type="AppstoreAddOutlined" />
      </UrpInput> 
      <h2>多图标</h2>
      <UrpInput 
        description='这里是描述信息' 
        maxlength={10} 
        showCount
        clearable
        type='password'
      >
        <UrpIcon type="AppstoreAddOutlined" />
      </UrpInput> 
      <h2>带前缀</h2>
      <UrpInput 
        description='这里是描述信息' 
        maxlength={10} 
        showCount
        clearable
      >
        <UrpIcon type="AppstoreAddOutlined" />
      </UrpInput> 
      <hr />
      <UrpInput 
        description='这里是描述信息' 
        maxlength={10} 
        showCount
        clearable
      >
        <span>提示文字</span>
      </UrpInput> 
      <h2>带描述</h2>
      <UrpInput description='这里是描述信息' maxlength={10} showCount clearable/>
      <h2>字数上限</h2>
      <UrpInput maxlength={10} showCount clearable/>
      <h2>显示字数</h2>
      <UrpInput showCount clearable/>
      <h2>可清理</h2>
      <UrpInput clearable/>
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
