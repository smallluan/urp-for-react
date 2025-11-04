# Switch 开关组件文档

## 一、样式分类
本组件库中的开关分为以下几类：

1. **普通开关**
  - 开关整体样式为`水平胶囊型容器`。滑块内嵌于开关中，滑块位置跟随开关状态，关闭时位于左侧，打开时位于右侧，滑块移动伴随动画(移动与拉伸)效果，背景随开关状态变色。
  - 当鼠标悬浮于按钮时，样式变为 `pointer`，`背景颜色变深` 来提示用户此开关可以点击。
  - 当状态为 `disabled` 时，以上效果无效。
  - 当状态为 `loading` 时，状态要设置为 `disabled`。

2. **滑块内置描述**
  - 可以通过向组件内传入一个`状态描述数组`，来描述当前开关状态。例如`['开', '关']`，也可以传入一组`图标组件数组`来让文字描述变为图标。
  - 当状态为 loading 时，必须显示为`内置加载旋转图标`。

3.  **外置描述**
  - 与滑块并排放置的文字或者图标，当状态切换时与滑块互换位置，其余同内置描述。

4. **方形开关**
  - 同上，容器与划款边框弧度变小，形成方形样式。

## 二、参数定义（Props）
|参数名|是否必填|参数类型|默认值|说明|
|--|--|--|--|--|
|`state`|N|`boolean`|`false`|开关状态|
|`loading`|N|`boolean`|`false`|开关是否正在加载，当加载时 `state` 变量为 `false`|
|`disabled`|N|`boolean`|`false`|开关是否可用|
|`shape`|N|`around \| rect`|`around`|按钮形状，圆角按钮和矩形按钮|
|`desc`|N|`Array<string>`|`[]`|文字描述|
|`descIcon`|N|`Array<string>`|`[]`|图标描述。文字描述和图标描述同时存在时，图标描述覆盖文字描述|
|`descPos`|N|`inner`\|`outter`|`inner`|描述信息所在的位置|
|`size`|N|`normal \| small \| large`|`normal`|组件尺寸|
|`onStateChange`|N|`function`|`() => {return true}`|开关状态变化回调|
|`beforeStateChange`|N|`(async) function`|`() => true`|状态变化前处理函数，当前仅当该函数返回 `true` 时状态改变。函数可以是同步或者异步，`异步函数必须返回一个 Promise`|
## 三、如何使用



## 四、迭代历史
- 2025-1026: 搭建出基本按钮框架，实现了基本样式，开关动画。
- 2025-1027: 添加 shape 参数，初步实现不同形状的开关
- 2025-1027: 添加：desc，descIcon，descPos，size 四个参数对应的组件样式
- 2025-1028: 添加 disabled，loading 样式和初步处理
- 2025-1028: beforeStateChange 函数支持对异步函数的处理
- 2025-1028: beforeStateChange 处理异步函数时的 loading 效果