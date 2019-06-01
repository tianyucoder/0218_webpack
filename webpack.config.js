/**
 * webpack的核心配置文件：执行webpack命令时，会在当前目录查找webpack.config.js文件读取配置
 * 1.通过Commonjs暴露出去一个对象
 * 2.四个关键的概念：
 *    entry：入口文件，将所有打包资源全部引入
 *    output：输出文件，将资源输出到指定目录下
 *    loader：处理webpack不能够解析的模块
 *    plugins：执行loader做不了的任务
 * 3.如何找到自己想要的loader？
 *   优先去官网找自己想要的loader，没有再去npm官网上找。
 * 4.在终端输入：webpack ./src/js/app.js ./build/js/built.js
 *  问题：这种方式只能够编译打包js、json文件，其他文件处理不了
 * 5.webpack --display-modules可以查看隐藏的任务
 */
const {resolve} = require('path'); //path内置的模块，用来设置路径。

module.exports = {
  //入口（从哪里进入开始解析）
  entry:'./src/js/index.js',

  //出口（最终加工完的代码输出到哪里）
  output: {// 输出配置
    path: resolve(__dirname, 'build'),//输出文件路径配置
    filename: 'index.js',// 输出文件名
  },

  //配置所有loader
  module: {
    rules: [
      //1.less-loader将less转换为css
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' //通过js动态向页面中构建一个style标签，并且将css样式注入
        }, {
          loader: 'css-loader' //将css转换为CommonJs的模块
        }, {
          loader: 'less-loader' //将less编译为css
        }]
      }
    ]
  }
};

