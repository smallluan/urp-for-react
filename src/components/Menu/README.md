### MenuHead
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**||||submenu 或者 menuitem|
|**onChange**||||激活菜单回调|
|**onExpand**||||展开菜单项回调|

### SubmenuHead
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**||||submenu 或者 menuitem|
|**icon**||||图标|
|**popupProps**||||透传 popup|
|**title**||||标题|
|**value**||||唯一标识|

### MenuItemHead
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**||||React.ReactNode|
|**content**||||同上|
|**icon**||||图标|
|**disabled**||||禁用（优先级小于submeun）|
|**href**||||跳转链接|
|**target**||_blank/_self/_parent/_top||跳转方式|
|**value**||||唯一标识|
|**onClick**||||点击时触发|

### Menu
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**|||||submenu 或者 menuitem|
|**header**||||头部区域|
|**footer**||||底部区域|
|**expand**||||展开的子菜单（受控属性）|
|**defaultExpand**||||展开的子菜单（非受控属性）|

### Submenu
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**||||submenu 或者 meunitem|
|**icon**||||图标|
|**title**||||标题|
|**value**||||唯一标识|

### MenuItem
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**children**||||React.ReactNode|
|**content**||||同上，优先级更低|
|**icon**||||图标|
|**value**||||唯一标识|
|**onClick**||||被点击时触发|
