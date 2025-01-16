module.exports = {
  // 可以自定义webpack配置
  module: {
    rules: [
      {
        test: /locales/,
        loader: '@alienfast/i18next-loader',
        include: [path.resolve(__dirname, './locales/**/*.json')],
      },
    ]
  }
}
