## 二、参数定义（Props）
**CheckBox.Group**
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`defaultValue`|N|`typeof value`|-|选中值（非受控属性）|
|`value`|N|`string \| number \| boolean \| null`|-|选中值（受控属性）|
|`cancelable`|N|`boolean`|`false`|是否可以取消选中|
|`disabled`|N|`boolean`|`false`|是否禁用|
|`readonly`|N|`boolean`|`false`|是否只读|
|`name`|N|`string`|-|HTML 原生属性|
|`children`|Y|`React.ReactNode`|-|选项|
|`multiple`|N|`boolean`|`false`|是否可以多选|
|`selectLimit`|N|`number`|`-1`|多选可选的数量上限|
|`checkedIcon`|N|`string`|`CheckOutlined`|选中图标（多选）|
|`onChange`|N|``|-|变更回调函数|
|`className`|||||
|`style`|||||

**CheckBox.Item**
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`value`|N|`string \| number \| boolean \| null`|-|值||
|`disabled`|N|`boolean`|`false`|是否禁用|
|`readonly`|N|`boolean`|`false`|是否只读|
|`label`|N|`React.ReactNode`|`选项一`|内容|
|`children`|N|`React.ReactNode`|`null`|内容|
|`onChange`|N|``|-|变更回调函数|
|`className`|||||
|`style`|||||

**CheckBox.Label**
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`children`|N|`React.ReactNode`|`null`|内容|
|`className`|||||
|`style`|||||