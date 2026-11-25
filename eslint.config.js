import js from '@eslint/js';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', 'games/**', 'content/**', 'templates/**'],
  },
  js.configs.recommended,
  {
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: { 'no-unused-vars': 'off', 'no-undef': 'off' },
  },
];
