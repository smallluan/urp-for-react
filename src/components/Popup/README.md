## 二、参数定义（Props）
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**|N|`string`|-|透传类名（popup）|
|**contentClassName**||||透传类名（content）|
|**style**|N|`object`|-|透传样式（popup）|
|**contentStyle**||||透传样式（content）|
|**content**|N|`string`|-|内容（标签属性）|
|**children**|N|`React.ReactNode`|-|被挂载元素&内容|
|**position**|N||弹层位置（popper.js）|
|**arrow**|N|`boolean`|`false`|是否显示箭头|
|**trigger**|N|`hover \| click \| rightClick \|`|`hover`|如何触发|
|**visible**|N|`boolean`|-|可见性（受控属性）|
|**destoryOnClose**||||关闭时是否销毁弹层内部元素|
|**onMouseEnter**|N|||鼠标进入事件|
|**onChange**|N|`(visible) => `||显示/隐藏状态变化回调|
