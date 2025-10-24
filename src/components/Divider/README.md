# Divider 组件文档

## 一、样式分类
通过简单图示直观展示 4 种样式（符号模拟效果）：

1. **纯分割线**  
   - 实线：`────────────────────────`  
   - 虚线：`- - - - - - - - - - - - -`（线型为虚线）  
   *说明：仅展示线条，支持实线/虚线切换。*

2. **单文字分割线**  
   - 文字左侧：`文字 ────────────────`  
   - 文字居中：`──────── 文字 ────────`  
   - 文字右侧：`─────────────── 文字`  
   *说明：文字与水平线嵌入排列，支持左/中/右对齐，兼容实线/虚线。*

3. **多文字水平分割线**  
   - 示例：`文字1 | 文字2 | 文字3`  
   *说明：多文字水平排布，用垂直分割线 `|` 间隔，兼容实线/虚线。*

4. **多文字嵌入式分割线**  
   - 示例：`──── 文字1 ──── 文字2 ──── 文字3 ────`  
   *说明：多文字嵌入水平线中，整体连贯，兼容实线/虚线。同时兼容 justify-content 布局*


## 二、参数定义（Props）
| 参数名    | 是否必填 | 参数类型                          | 默认值       | 说明                                                                 |
|-----------|----------|-----------------------------------|--------------|----------------------------------------------------------------------|
| `children`| 否       | `React.ReactNode | `undefined`  | 分割线内容：<br>- 空值 → 纯分割线；<br>- 字符串 → 单文字；<br>- 数组 → 多文字。 |
| `layout`  | 否       | `horizontal` \| `vertical`        | `horizontal` | 方向控制：<br>- 单内容时固定为 `horizontal`；<br>- 多内容时 `vertical` 生效。 |
| `dashed`  | 否       | boolean                           | `false`      | 线型切换：`true` 为虚线，`false` 为实线（全样式兼容）。               |
| `align`   | 否       | `left` \| `center` \| `right`\| `around`\|`between`     | `center`     | 文字对齐：around 和 between 是为多子元素提供的布局，在单子元素上使用时相当于 center。              
| `color`   | 否       | string | `gray` | 分割线的颜色。 |
| `slope`   | 否       |  boolean    | `false` | 分割线是否倾斜（layout = vertical 时生效） |   
| `space`   | 否       | string | `8px` | 线与字的间隔 |

## 三、如何使用
```html
<!-- 水平分割线(实线) -->
<UrpDivider/>

<!-- 水平分割线(虚线) -->
<UrpDivider dashed />

<!-- 带文字的水平分割线 -->
<UrpDivider>分割线</UrpDivider>

<!-- 文字左对齐 -->
<UrpDivider align='left'>分割线</UrpDivider>

<!-- 文字右对齐 -->
<UrpDivider dashed align='right'>分割线</UrpDivider>

<!-- 垂直分割线 -->
<UrpDivider layout='vertical'>
   <div>富强</div>
   <div>民主</div>
   <div>文明</div>
   <div>和谐</div>
</UrpDivider>

<!-- 垂直虚线分割 -->
<UrpDivider layout='vertical' dashed>
   <div>自由</div>
   <div>平等</div>
   <div>公正</div>
   <div>法治</div>
</UrpDivider>

<!-- 倾斜垂直分割 -->
<UrpDivider layout='vertical' dashed space='8px' slope>
   <div>爱国</div>
   <div>敬业</div>
   <div>诚信</div>
   <div>友善</div>
</UrpDivider>

<!-- 水平分割组 -->
 <UrpDivider>
   <div>富强</div>
   <div>民主</div>
   <div>文明</div>
   <div>和谐</div>
</UrpDivider>
```

## 四、迭代历史
- 2025-1024: 除水平分割组以外均实现。未实现水平分割组时，align 属性中 `around` \| `between` 无效。
- 2025-1024: 除水平分割组已实现，但未兼容 `around` \| `between` 属性
