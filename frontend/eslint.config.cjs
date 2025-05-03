const typescriptParser = require('@typescript-eslint/parser')
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = [
  {
    ignores: ['node_modules', 'dist', 'coverage', 'public']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/camelcase': ['off', { properties: 'never' }],
      '@typescript-eslint/member-delimiter-style': 0,
      '@typescript-eslint/no-namespace': ['off'],
      '@typescript-eslint/no-var-requires': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      camelcase: 'off',
      'comma-dangle': 2,
      'no-extra-semi': 2,
      'no-irregular-whitespace': 2,
      'no-lonely-if': 2,
      'no-multi-spaces': 2,
      'no-multiple-empty-lines': 1,
      'no-trailing-spaces': 2,
      'no-control-regex': 0,
      'no-unexpected-multiline': 2,
      'no-unreachable': 'error',
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ]
    }
  }
]
