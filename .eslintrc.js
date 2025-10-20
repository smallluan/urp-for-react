/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // 1. 继承 TypeScript 相关规则和 React 官方配置
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // 支持 React 17+ 无需导入 React 的 JSX 转换
    'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
    'react-app' // 集成 CRA 自带的 ESLint 配置（如果是 CRA 项目）
  ],
  // 2. 指定 TypeScript 解析器
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // 3. 启用 TypeScript 插件
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 关闭原生 no-unused-vars，改用 TypeScript 专用规则
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error', // 正确识别类型使用
    
    // 保留你原有的规则
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'never'],
    // quotes: ['error', 'single'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}