module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/main-style.scss";
          @import "@/style/main-colors.scss";
          @import "@/style/menu-style.scss";
          `
      },
    },
  },
};
