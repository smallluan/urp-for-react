/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // 使用 jsx 时不必须引入 React
    'react/react-in-jsx-scope': 'off',
    // 禁止使用分号，即无分号标准
    semi: ['error', 'never'], 
    // 可以按需添加其他规则，比如统一使用单引号
    quotes: ['error', 'single'], 
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}