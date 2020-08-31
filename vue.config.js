module.exports = {
  devServer: {
    host: 'localhost',
    proxy: {
      "^/api/": {
        target: "http://localhost:8000/",
        changeOrigin: true,
        pathRewrite: { "^/api": "/" },
        logLevel: "info"
      }
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~@/assets/scss/abstract/_variables.scss";
        @import "~@/assets/scss/abstract/_mixins.scss";
        @import '~@/assets/scss/theme.scss';
        @import '~@/assets/scss/components/buttons.scss';
        @import '~@/assets/scss/components/forms.scss';
        @import '~@/assets/scss/base/typography.scss';
        `
      }
    }
  }
}
