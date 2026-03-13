import { baseConfig } from './base.mjs';

const config = [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        emitDecoratorMetadata: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export default config;
