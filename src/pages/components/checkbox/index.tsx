import { UrpCheckBox } from "../../../components/CheckBox/index.ts"

export default function CheckBoxPage() {
  return(
    <div>
      <h2>多选</h2>
      <UrpCheckBox.Group 
        value={['1', '3']} 
        name="group2" 
        cancelable={true}
        multiple
        onChange={(value) => console.log(value)}
      >
        <UrpCheckBox.Item value="0">
          <UrpCheckBox.Label>选项一</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="1">
          <UrpCheckBox.Label>选项二</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="2">
          <UrpCheckBox.Label>选项三</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="3">
          <UrpCheckBox.Label>选项四</UrpCheckBox.Label>
        </UrpCheckBox.Item>
      </UrpCheckBox.Group>
      <UrpCheckBox.Group 
        value={[]} 
        name="group2" 
        multiple
        onChange={(value) => console.log(value)}
      >
        <UrpCheckBox.Item value="0">
          <UrpCheckBox.Label>选项一</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="1">
          <UrpCheckBox.Label>选项二</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="2">
          <UrpCheckBox.Label>选项三</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="3">
          <UrpCheckBox.Label>选项四</UrpCheckBox.Label>
        </UrpCheckBox.Item>
      </UrpCheckBox.Group>

      <h2>可取消单选框</h2>
      <UrpCheckBox.Group 
        value="-1" 
        name="group2" 
        cancelable={true}
        onChange={(value) => console.log(value)}
      >
        <UrpCheckBox.Item value="0">
          <UrpCheckBox.Label>选项一</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="1">
          <UrpCheckBox.Label>选项二</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="2">
          <UrpCheckBox.Label>选项三</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="3">
          <UrpCheckBox.Label>选项四</UrpCheckBox.Label>
        </UrpCheckBox.Item>
      </UrpCheckBox.Group>
      <UrpCheckBox.Group 
        value="-1" 
        name="group1" 
        cancelable={true}
        onChange={(value) => console.log(value)}
      >
        <UrpCheckBox.Item value="1">
          <UrpCheckBox.Label>选项一</UrpCheckBox.Label>
        </UrpCheckBox.Item>
      </UrpCheckBox.Group>
      <h2>一组单选框</h2>
      <UrpCheckBox.Group 
        value="-1" 
        name="group2" 
        onChange={(value) => console.log(value)}
      >
        <UrpCheckBox.Item value="0">
          <UrpCheckBox.Label>选项一</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="1">
          <UrpCheckBox.Label>选项二</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="2">
          <UrpCheckBox.Label>选项三</UrpCheckBox.Label>
        </UrpCheckBox.Item>
        <UrpCheckBox.Item value="3">
          <UrpCheckBox.Label>选项四</UrpCheckBox.Label>
        </UrpCheckBox.Item>
      </UrpCheckBox.Group>
      <h2>单个单选框</h2>
      <UrpCheckBox.Group 
        value="-1" 
        name="group1" 
        onChange={(value) => console.log(value)}
      >
        <UrpCheckBox.Item value="1">
          <UrpCheckBox.Label>选项一</UrpCheckBox.Label>
        </UrpCheckBox.Item>
      </UrpCheckBox.Group>
    </div>
  )
}
