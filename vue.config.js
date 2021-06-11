module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/main-style.scss";
          @import "@/style/main-colors.scss";
          @import "@/style/menu-style.scss";
          `,
      },
    },
  },
  devServer: {
    disableHostCheck: true,

    // proxy: {
    //   "/*": {
    //     target: "http://localhost:8081/",
    //     secure: false,
    //     prependPath: false,
    //     proxyTimeout: 1000 * 60 * 10,
    //     timeout: 1000 * 60 * 10,
    //   },
    // },
  },
};
