// 首先要安装 eslint，eslint 默认使用 Espree 进行解析，无法识别 ts 的一些语法，所以需要安装一个 ts 的解析器 @typescript-eslint/parser，用它来代替默认的解析器，然后由 @typescript-eslint/eslint-plugin 来提供有关 ts 的规则补充。
// 由于是 react 项目，所以还需要插件 eslint-plugin-react 来支持 .tsx。
// eslint 规则众多，且有些原生规则在 ts 中不兼容，推荐 alloy 的这套配置 eslint-config-alloy，它提供了 ts + react 的版本，并且不包含代码格式的部分，与 Prettier 完全兼容。
// 最后是提供给 webpack 的 eslint-loader，可以在使用 webpack-dev-server 开发中实时检查，越早发现错误越好解决。
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'react'],
  extends: ['plugin:prettier/recommended', 'alloy', 'alloy/react', 'alloy/typescript'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    // 您的环境变量（包含多个预定义的全局变量）
    // Your environments (which contains several predefined global variables)
    //
    browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 您的全局变量（设置为 false 表示它不允许被重新赋值）
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // 自定义您的规则
    // Customize your rules
    // 'prettier/prettier': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'func-names': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [2, { args: 'none' }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-unresolved': 0,
    'prefer-promise-reject-errors': 0,
    'prefer-destructuring': 0,
    'react/prop-types': 0,
    'react/state-in-constructor': [1, 'never'],
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': [0, 'always'],
    'react/jsx-fragments': 0,
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-use-before-define': 0,
    'object-shorthand': 0,
    'import/order': 0,
    'react/self-closing-comp': 0,
    'no-else-return': 0,
    'import/prefer-default-export': 0,
    'react/jsx-closing-tag-location': 0,
    'dot-notation': 0,
    'no-restricted-syntax': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'react/jsx-curly-brace-presence': 0,
    'lines-between-class-members': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-filename-extension': 0,
    'no-nested-ternary': 0,
    'import/extensions': 0,
    // 'react/state-in-constructor': 0,
    'no-param-reassign': 0,
    'jsx-a11y/media-has-caption': 0,
    'react/jsx-curly-newline': 0,
    'react/require-default-props': 0,
    'no-return-assign': 0,
    radix: 0,
    'react/forbid-prop-types': 0,
    'react/static-property-placement': 0,
    'no-restricted-globals': 0,
    'react/prefer-stateless-function': 0,
    '@typescript-eslint/no-require-imports': 0,
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
