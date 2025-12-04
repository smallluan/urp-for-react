## 二、参数定义（Props）
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**|N|`string`|-|透传类名|
|**style**|N|`object`|-|透传样式|
|**absolute**|N|`boolean`|`false`|是否脱离标准流显示|
|**position**|N|`bottom \| top \| left \| right`|`bottom`|弹层位置|
|**arrow**|N|`boolean`|`false`|是否显示箭头|
|**hide**|N|`(mouseLeave \| clickOutter) \| boolean` |`mouseLeave`|内容何时消失|
|**trigger**|N|`hover \| click \|`|`hover`|如何触发|
|**content**|N|`string`|-|内容（标签属性）|
|**children**|N|`React.ReactNode`|-|被挂载元素&内容|
