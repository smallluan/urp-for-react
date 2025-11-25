import { CheckBox } from "../../../components/CheckBox/index.ts"

export default function CheckBoxPage() {
  return(
    <div>
      <CheckBox value="1" name="group" onChange={(value) => console.log(value)}>
        <CheckBox.Item label="选项一" value="1"/>
        <CheckBox.Item label="选项二" value="2"/>
      </CheckBox>
    </div>
  )
}
