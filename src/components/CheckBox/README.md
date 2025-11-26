## 二、参数定义（Props）
**CheckBox.Group**
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`value`|N|`string \| number \| boolean`|-|默认选中item的value|
|`cancelable`|N|`boolean`|`false`|是否可以取消选中|
|`disabled`|N|`boolean`|`false`|是否禁用|
|`readonly`|N|`boolean`|`false`|是否只读|
|`name`|N|`string`|-|HTML 原生属性|
|`children`|Y|`React.ReactNode`|-|选项|
|`onChange`|N|``|-|变更回调函数|

**CheckBox.Item**
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`value`|N|`any`|-|值||
|`disabled`|N|`boolean`|`false`|是否禁用|
|`readonly`|N|`boolean`|`false`|是否只读|
|`label`|N|`React.ReactNode`|`选项一`|内容|
|`onChange`|N|``|-|变更回调函数|