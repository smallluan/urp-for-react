## List Props
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||类名|
|**style**||||样式|
|**header**||||头部元素|
|**footer**||||底部元素|
|**split**||||是否展示分割线|
|**gap**||||列表项之间的间距|
|**width**||||容器宽度|
|**height**||||容器高度|
|**type**||`normal \| virtual \| lazy`||列表类型|
|**virtual**||||虚拟列表时属性配置|
|**onScroll**||||滚动时触发|

## Virtual List Props 
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**count**||||列表项总数|
|**size**||||每个列表项的高度（预期高度）|
|**initialScrollOffset**||||初始滚动偏移量|
|**overscanCount**||||加载缓冲项个数|
|**ignoreScrollEvent**||||是否忽略非用户手动引起的滚动事件|
|**onItemsRendered**||||列表项渲染回调|

## Virtual List Instance
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**scrollToIndex**||||滚动到指定索引的元素|


## List Item
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||类名|
|**style**||||样式|
|**content**||||内容，优先级小于 children|
|**children**||||内容，优先级高于 content|
|**action**||||操作栏|
