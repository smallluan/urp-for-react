### Collapse Props 
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||`string`||透传类|
|**style**||`React.CssProperties`||透传样式|
|**borderless**||||是否无边框|
|**disabled**||||禁用，优先级小于子元素同名属性|
|**defaultValue**||||默认展开的面板(非受控)|
|**value**||||展开的面板(受控)|
|**defaultExpandAll**||||是否默认全部展开|
|**expandMutex**||||是否互斥展开(手风琴样式)|
|**onChange**||||面板切换状态时触发|

### Panel Props
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||`string`||透传类|
|**style**||`React.CssProperties`||透传样式|
|**children**||`React.ReactNode`||被折叠的内容(优先级高)|
|**content**||`React.ReactNode`||被折叠的内容(优先级低)|
|**header**||||头部区域(图标除外)|
|**borderless**||||是否无边框(优先级高于父元素同名属性)|
|**icon**||||图标自定义(不传入则不显示，但是强制允许点击标题行时展开面板)|
|**iconPlacement**||||图标位置|
|**destroyOnCollapse**||||折叠后是否销毁对应的 dom 元素|
|**expandOnRowClick**||||是否允许点击标题行展开面板|
|**disabled**||||禁用，优先级大于父元素的同名属性|
|**value**||||当前面板在面板组中的唯一标识|
|**expand**||||展开状态（受控属性）|
|**defaultExpand**||||展开状态（非受控属性）|
|**onChange**||||面板切换状态时触发|
