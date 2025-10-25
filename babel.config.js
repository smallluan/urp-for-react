// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    '@babel/preset-react' // 确保已存在 React 预设
  ],
  plugins: [
    // 自动注入 React，支持无显式导入的 JSX
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
  ]
}