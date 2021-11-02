module.exports = {
  processors: [],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'], //, 'stylelint-config-rational-order'
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
    'rule-empty-line-before': false,
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
};
