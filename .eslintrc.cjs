module.exports = {
  plugins: ['unused-imports'],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['node_modules/', 'dist/', '.storybook/', '.github', 'storybook-static/', 'rollup.config.js'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    // forwardRef에서 displayName문제해결을 위해
    'react/display-name': 'off',
  },
  settings: {
    react: { version: 'detect' },
  },
};
