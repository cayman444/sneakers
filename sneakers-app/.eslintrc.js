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
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1], ignoreArrayIndexes: true }],
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
