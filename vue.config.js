module.exports = {
  devServer: {
    host: '127.0.0.1'
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~@/assets/scss/abstract/_variables.scss";
        @import "~@/assets/scss/abstract/_mixins.scss";
        @import '~@/assets/scss/theme.scss';
        @import '~@/assets/scss/base/typography.scss';
        `
      }
    }
  }
}
