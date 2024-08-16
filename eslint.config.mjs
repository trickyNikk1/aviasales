import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'

import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'
import airbnbTsConfig from 'eslint-config-airbnb-typescript'

import importPlugin from 'eslint-plugin-import'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'

/** @type {import('eslint').Linter.FlatConfig} */
const config = [
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxPlugin,
      '@typescript-eslint': tsEslintPlugin,
    },
  },
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      ...prettierConfig.rules,
      ...airbnbTsConfig.rules,
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
  },
]

export default config
