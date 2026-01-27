## Pagination Props
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**total**||||数据总数|
|**pageSize**||||每一页的数据量（受控属性）|
|**defaultPageSize**||||每一页的数据量（非受控属性）|
|**current**||||当前所在的页码（受控属性）|
|**defaultCurrent**||||当前所在的页码（非受控属性）|
|**pageSizeOptions**||||分页大小数组|
|**maxPageBtn**||||不折叠情况下显示的最多页码按钮数量|
|**foldedMaxPageBtn**||||折叠情况下显示的最多按钮数量|
|**showFirstAndLastPageBtn**||||是否显示首页和尾页的按钮（仅折叠）|
|**showPreviousAndNextBtn**||||是否显示上一个/下一个按钮|
|**showPageSizeOptions**||||是否显示页码选择|
|**showJumper**||||是否显示快速跳转|
|**size**||||尺寸|
|**onPageSizeChange**||||分页大小发生变化时触发|
|**onCurrentChange**||||当前所在页码发生变化时触发|

## Pagination.Mini Props
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**className**||||透传类名|
|**style**||||透传样式|
|**total**||||数据总数|
|**pageSize**||||每一页的数据量（由于mini没有 options 所以不存在受控与非受控的区分）|
|**current**||||当前所在页数|
|**defaultCurrent**||||当前所在的页码（非受控属性）|
|**size**||||尺寸|
|**disabled**||||禁用|
|**jumpable**||||是否可以快速跳转|
|**onCurrentChange**||||当前所在页码发生变化时触发|
