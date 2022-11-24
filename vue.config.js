module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: 'localhost:8080'
},
publicPath: "/"
};
