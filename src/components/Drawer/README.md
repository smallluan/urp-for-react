|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||按钮体类|
|**style**|||按钮体样式|
|**visible**||||是否可见（仅受控）|
|**header**||||头部插槽元素|
|**footer**||||尾部插槽元素|
|**attach**||||挂载到哪个元素，默认是 body，输入字符串则按字符串去检索对应的 id|
|**children**||||内容|
|**content**||||同上|
|**closeBtn**||||关闭按钮，传入布尔值控制显隐；传入字符串修改文案，传入对象则将属性透传至 Button|
|**confirmBtn**||||确认按钮，传入布尔值控制显隐；传入字符串修改文案，传入对象则将属性透传至 Button|
|**cancelBtn**||||取消按钮，传入布尔值控制显隐；传入字符串修改文案，传入对象则将属性透传至 Button|
|**destroyOnClose**||||隐藏时销毁对应的 dom 元素|
|**position**||||显示方向（上下左右）|
|**zIndex**||||层级索引|
|**onConfirm**||||点击确认按钮|
|**onCancel**||||点击取消按钮|
|**onCloseBtnClick**||||点击关闭按钮|
|**onClose**||||被关闭时触发（ESC键、取消、关闭按钮）|
|**onEscKeydown**||||ESC 键按下触发|
|**onOverlayClick**||||点击蒙层时触发|