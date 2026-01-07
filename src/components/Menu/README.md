### Menu
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**||||submenu 或者 menuitem|
|**onChange**||||激活菜单回调|
|**onExpand**||||展开菜单项回调|

### Submenu
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**||||submenu 或者 menuitem|
|**icon**||||图标|
|**popupProps**||||透传 popup|
|**title**||||标题|
|**value**||||唯一标识|

### MenuItem
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**||||React.ReactNode|
|**content**||||同上|
|**disabled**||||禁用（优先级小于submeun）|
|**href**||||跳转链接|
|**target**||_blank/_self/_parent/_top||跳转方式|
|**value**||||唯一标识|
|**onClick**||||点击时触发|
