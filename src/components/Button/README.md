## 二、参数定义（Props）
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`content`|N|`ReactNode`|''|文字内容|
|`variant`|N|`base \| outline \| dashed \| text`|`base`|按钮形式: `基础/线框/虚线框/纯文字`|
|`theme`|N|`default \| primary \| warning \| success \| error`|`primary`|按钮主题|
|`shape`|N|`react \| round`|`react`|按钮形状|
|`disabled`|N|`boolean`|`false`|是否禁用|
|`loading`|N|`boolean`|`false`|是否加载中|
|`block`|N|`boolean`|`false`|是否为块级元素|
|`icon`|N|`string`||按钮图标|
|`size`|N|`normal \| small \| large`|`normal`|按钮尺寸|
|``|N|`(e) => void`||点击事件|
