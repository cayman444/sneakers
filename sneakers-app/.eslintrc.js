module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'no-debugger': 'off',
    'no-console': 'off',
    // eslint-disable-next-line no-magic-numbers
    indent: ['error', 2],
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'prefer-destructuring': 'off',
    'no-magic-numbers': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'consistent-return': 'off',
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-unresolved': 'off',
  },
};
