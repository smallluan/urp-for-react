## 必须先完成适用于 select 的 popup 组件才行

## 二、参数定义（Props）
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|**multiple**|N|`boolean`|`false`|是否多选（checkbox）|
|**options**|N|`Array`|`[]`|选项|
|**value**|N|`string \| string[]`|-|选中值（受控属性）|
|**defaultValue**|N|`string \| string[]`|-|选中值（非受控属性）|
|**borderless**|||||
|**position**||||popup属性。弹层方向|
|**clearable**||||是否可清空|
|**hideSelected**||||是否隐藏已经转选中的项（仅单选）|
|**hideRadioCircle**||||是否隐藏单选时前面的圆圈|
|**inputable**||||是否可输入|
|**cancleable**||||是否可以取消选择（checkbox）|
|**selectLimit**|N|`number`|`-1`|多选可选的数量上限（checkbox）|
|**maxVisibleNum**||||多选最多完整显示多少个元素|
|**size**||||尺寸|

**多选不允许隐藏已选择项**
