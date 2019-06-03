//引入extract-text-webpack-plugin插件，提取css为单独文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入clean-webpack-plugin插件，清空指定目录
const CleanWebpackPlugin = require('clean-webpack-plugin')
//引入公共配置文件
const base = require('./webpack.base')
//引入合并库
const merge = require('webpack-merge')
//引入path模块
const {resolve} = require('path')
//引入webpack,目的是为了使用webpack身上的UglifyjsWebpackPlugin
const webpack = require('webpack')
//压缩css
const CleanCSSPlugin = require("less-plugin-clean-css");
//引入html-webpack-plugin用于压缩html
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(base,{

  //输出（最终加工完的代码输出到哪里）
  output: {
    //输出配置
    path: resolve(__dirname, '../dist'),//输出文件路径配置
    filename: './js/[name].[hash:5].min.js'// 输出文件名
  },

  //配置所有loader
  module: {
    rules: [
      //1.less-loader将less转换为css
      {
        test: /\.less$/, //匹配文件的规则，说明该loader对哪个文件生效
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","postcss-loader",{
            loader: "less-loader", options: {
            plugins: [
              new CleanCSSPlugin({ advanced: true })
            ]}
          }]
        })
      },
    ]
  },

  //配置所有的plugins
  plugins: [
    //提取css为单独文件
    new ExtractTextPlugin("./css/[name].[hash:5].min.css"),
    //清空输出文件夹
    new CleanWebpackPlugin(),
    //压缩js
    new webpack.optimize.UglifyJsPlugin({
      sourceMap:true//构建一个映射文件(相当于一个字典)
    }),
    new HtmlWebpackPlugin({
      title:"0218",//对应html中的title标签
      filename:"index.html",//生成html文件的名字
      template:"./src/index.html",//参照的模板
      minify:{
        removeComments:true, //移除注释
        collapseWhitespace:true}//移除换行
    }),
  ],

  devtool:'source-map'//给所有需要压缩的资源，都构建一个映射文件

})

