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
    'import/no-absolute-path': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
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
    'vue/valid-template-root': 'off',
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
}
