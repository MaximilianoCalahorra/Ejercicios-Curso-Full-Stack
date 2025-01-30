const jsPlugin = require('@stylistic/eslint-plugin-js');

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        node: true,
        es2021: true
      }
    },
    plugins: {
      '@stylistic/js': jsPlugin
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ]
    }
  },
  {
    plugins: {
      '@stylistic/js': jsPlugin
    }
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**'
    ]
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'indent': ['error', 2],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0
    }
  }
];
