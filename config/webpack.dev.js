//引入webpack
const webpack = require('webpack');
//引入公共配置文件
const base = require('./webpack.base')
//引入合并库
const merge = require('webpack-merge')

module.exports = merge(base,{
  //入口（从哪里进入开始解析）
  entry:['./src/js/index.js','./src/index.html'],

  //配置所有loader
  module: {
    rules: [
     /*
        引入：less-loader处理less文件
          1.将less编译为css
          2.将css转换为CommonJs的模块
          3.通过js动态向页面中构建一个style标签，并且将css样式注入
     */
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' //通过js动态向页面中构建一个style标签，并且将css样式注入
        }, {
          loader: 'css-loader' //将css转换为CommonJs的模块
        }, {
          loader: 'less-loader' //将less编译为css
        }]
      },
      //引入html-loader
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      }
    ]
  },

  //配置所有的plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    hot: true,//开启热模替换（启用HMR）
    open:true,//是否自动打开浏览器
    port:3001,//dev服务器的端口号
    compress:true//性能好一些（启用gzip压缩）
  }

});

