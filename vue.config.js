const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',  //不添加这句话本地就无法运行
  transpileDependencies: true,
  lintOnSave:false
})
