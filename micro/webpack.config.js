const path = require('node:path');

module.exports = {
  // 可以自定义webpack配置
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /locales/,
        loader: '@alienfast/i18next-loader',
        include: [path.resolve(__dirname, './locales/**/*.json')],
      },
    ],
  },
};
