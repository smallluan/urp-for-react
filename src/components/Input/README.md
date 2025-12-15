## 二、参数定义（Props）
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`align`|N|`left \| center \| right`|`left`|文本内容位置，居左/居中/居右|
|`autoWidth`|N|`boolean`|`false`|宽度随内容自适应|
|`disabled`|N|`boolean`|`false`|是否禁用|
|`maxlength`|N|`number`|`-1`|输入最大字符，-1 代表不校验长度，为 0 时输入框将被设置为 disabled|
|`placeholder`|N|`string`|`请输入`|输入框占位符|
|`readonly`|N|`boolean`|`false`|只读（注意区分一下和 disabled 的区别）|
|`value`|N|`string`|-|输入框的值|
|`clearable`|N|`boolean`|`false`|是否有一键清除图标|
|`size`|N|`normal \| small \| large`|`normal`|尺寸|
|`shape`|N|`round \| rect`|`rect`|输入框形状|
|`type`|N|`text \|number \|url \| tel \| password`|`text`|输入框类型|
|`showCount`|N|`boolean`|`false`|是否显示当前字数|
|`description`|N|`string`|-|描述文字|
|`children`|N|`ReactNode`|-|输入框前缀|
|`icons`|N|`string \| string[]`|-|额外的图标|
|**borderless**||||无边框|
|**onChange**||||输入触发|
