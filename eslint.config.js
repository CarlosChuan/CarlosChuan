import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsparser,
    },
    plugins: {
      react,
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      'indent': ['error', 'tab'],
      '@typescript-eslint/indent': ['error', 'tab'],
      'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      ...react.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['*.js'],
    languageOptions: {
      parser: 'espree',
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
    },
  },
];