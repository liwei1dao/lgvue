const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.devServer.port(8080);
    config.devServer.proxy(
      {
        // 把key的路径代理到target位置
        ["/lego"]: { //需要代理的路径   例如 '/lego'
          target: `http://127.0.0.1:8000`, //代理到 目标路径
          changeOrigin: true,
          secure: false,
          logLevel: 'debug',
          pathRewrite: { // 修改路径数据
            ['^/lego']: '' // 举例 '^/lego:""' 把路径中的/lego字符串删除
          }
        }
      }
    );
    // config.devServer = {
    //   port: 8080,
    //   open: true,
    //   overlay: {
    //     warnings: false,
    //     errors: true
    //   },
    //   proxy: {
    //     // 把key的路径代理到target位置
    //     ["/lego"]: { //需要代理的路径   例如 '/lego'
    //       target: `http://127.0.0.1:8000`, //代理到 目标路径
    //       changeOrigin: true,
    //       secure: false,
    //       logLevel: 'debug',
    //       // pathRewrite: { // 修改路径数据
    //       //   ['^/lego']: '' // 举例 '^/lego:""' 把路径中的/lego字符串删除
    //       // }
    //     }
    //   },
  },
})
