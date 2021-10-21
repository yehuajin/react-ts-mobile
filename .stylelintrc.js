module.exports = {
  processors: [],
  plugins: ['stylelint-order'],
  extends: 'stylelint-config-standard', // 这是官方推荐的方式
  rules: {
    'at-rule-empty-line-before': 'always' | 'never',
    'at-rule-name-case': 'lower' | 'upper',
    'block-no-empty': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'comment-empty-line-before': false,
    'value-list-comma-newline-after': false,
    'declaration-colon-newline-after': false,
  },
};
