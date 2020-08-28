module.exports = {
  extends: [
    'standard',
    'plugin:vue/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/vue',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: '2020',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: [
          // vue core
          'keep-alive',
          'transition',
          'transition-group',
          'component',
          'slot',

          // vue-router
          'router-link',
          'router-view',
        ],
      },
    ],
  },
  env: {
    node: true,
    es6: true,
  },
}
