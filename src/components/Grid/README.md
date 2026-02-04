## 二、参数定义（Props）
**Grid.Row**
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**|||||
|**style**|||||
|**align**|N|`start \| center \| end`|`center`|纵向对齐方式|
|**justify**|N|`start \| center \| end \| space-around \| space-between`|`center`|水平方向排列方式|
|**gutter**|N|`string \| number`|0|列间隔|
|**grids**|N|`number`|24|行栅格数量|
|**style**|N||-|栅格容器行内联样式|

**Grid.Col**
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**|||||
|**style**||||栅格容器列内联样式|
|**span**|N|`number`|0|列跨栅格数|
|**offset**|N|`number`|0|列向右偏移栅格数|
|**xs**|N|`number`|-|响应式 span `<=768px`|
|**sm**|N|`number`|-|响应式 span `768px<= size <=992px`|
|**md**|N|`number`|-|响应式 span `992px<= size <=1200px`|
|**lg**|N|`number`|-|响应式 span `1200px<= size <=1400px`|
|**xl**|N|`number`|-|响应式 span `1400<= size <=1880px`|
|**xxl**|N|`number`|-|响应式 span `>=1880px`|
