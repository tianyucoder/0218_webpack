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
//path内置的模块，用来设置路径。
const {resolve} = require('path');
//引入extract-text-webpack-plugin提取css为单独文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入HtmlWebpackPlugin，生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清空指定目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
      },
      //2.引入html-loader
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
    port:3001,//服务器的端口号
    compress:true//性能好一些（启用gzip压缩）
  }

});

