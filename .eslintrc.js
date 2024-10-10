module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },  
  rules: {
      "@next/next/no-img-element": "off", // If you want to keep using <img> tags
      "react/no-unescaped-entities": "off" // If you want to keep using unescaped entities
    }
  }