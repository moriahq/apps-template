module.exports = {
  root: true,
  extends: [require.resolve('@giteeteam/apps-matrix/lib/eslint')],
  plugins: ['react-hooks'],
  rules: {
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    'react-hooks/rules-of-hooks': 'error',
  },
};
