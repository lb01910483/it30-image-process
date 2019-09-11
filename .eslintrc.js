module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['vue'],

  // add your custom rules here
  rules: {
    'vue/html-self-closing': 'off',
    'no-unused-vars': 1,
    semi: [2, 'never'],
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    'no-console': 'off',
    'space-before-function-paren': [
      1,
      {
        anonymous: 'ignore',
        named: 'ignore',
        asyncArrow: 'ignore'
      }
    ],
    'generator-star-spacing': 'off', // prettier not support
    'vue/max-attributes-per-line': 'off',
    'vue/script-indent': [2, 2, { baseIndent: 1, switchCase: 1 }],
    'vue/order-in-components': [
      1,
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          'fetch',
          ['props', 'propsData'],
          'asyncData',
          'data',
          'computed',
          'methods',
          'watch',
          'LIFECYCLE_HOOKS',
          ['template', 'render'],
          'renderError'
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ],
  globals: {}
}
