// jest.setup.js
// 模拟 CSS.supports 方法，避免测试环境报错
global.CSS = {
  ...global.CSS,
  supports: jest.fn(() => true) // 简单模拟为始终返回 true
}