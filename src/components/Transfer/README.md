## 二、参数定义（Props）
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`data`|N|`Array`|`[]`|数据源列表|
|`cheked`|N|`Array`|-|数据源中被选中的项（受控属性）|
|`defaultChecked`|N|`Array`|`[]`|数据源中被选中的项（非受控属性）|
|`value`|N|`Array`|-|已穿梭的数据（受控属性）|
|`defaultValue`|N|`Array`|`[]`|已穿梭的数据（非受控属性）|
|`beforeTransfer`|N|`Function`|-|数据穿梭前校验（组件应该将方向作为参数）|
|`showCheckAll`|N|`boolean`|`true`|是否展示全选|
|`direction`|N|`'left' \| 'right' \| 'both'`|`both`|穿梭框可选的穿梭方向|
