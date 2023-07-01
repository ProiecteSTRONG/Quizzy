module.exports = {
    env: {
      browser: false,
      es2021: true,
      node: true,
    },
    extends: ['standard-with-typescript'],
    overrides: [
      {
        files: ['.eslintrc.js', '.eslintrc.cjs'],
        parserOptions: {
          sourceType: 'module',
        },
      },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/semi': ['error', 'always'], // Updated to 'always'
      '@typescript-eslint/no-confusing-void-expression': 'off',
    },
  };
  