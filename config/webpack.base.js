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

//引入内置的path模块，用来设置路径。
const {resolve} = require('path');
//引入HtmlWebpackPlugin插件，生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  //入口（告诉webpack从哪里进入开始解析）
  entry:'./src/js/index.js',

  //输出（最终加工完的代码输出到哪里）
  output: {
    //输出配置
    path: resolve(__dirname, '../build'),//输出文件路径配置
    filename: 'index.js',// 输出文件名
  },

  //在这里配置所有loader
  module: {
    rules: [
      //使用url-loader将图片转base64编码
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath:'img',//图片最终输出的位置
              publicPath:'../img',//css资源图片路径
              name:'[hash:5].[ext]',  //修改图片名称
              limit: 8192 //当图片小于8K的时，转base64
            }
          }
        ]
      },
      //使用jshint-loader进行js语法检查
      {
        test: /.js/,
        enforce: 'pre',//预先加载好语法检查工具
        exclude: /node_modules/, //跳过node_modules文件夹
        use: [
          {
            loader: `jshint-loader`,
            options: {
              /*
                jslint的错误信息在默认情况下会显示为 warning（警告）类信息
                  -- emitErrors为true，检查出的错误显示为 error（错误）类信息。
                  -- emitErrors为false，检查出的错误显示为 warning（错误）类信息。
              */
              emitErrors: true,

              /*
                注意：jshint默认情况下不会打断webpack编译，即：failOnHint默认值为false
                    -- failOnHint为true，当jshint检查出错误时，直接打断当前的代码的编译。
                    -- failOnHint为false，当jshint检查出错误时，会继续编译。
              */
              failOnHint: false,

              /*
              告诉jshint，不在提示新语法兼容性问题
              */
              esversion: 6,

              /*
              * 自定义一个错误报告函数（当出现错误时，自动注入错误信息）
              * */
              /*reporter:function(err){
                console.log(err)
              }*/

            }
          }
        ]
      },
      //使用babel-loader将es6语法转为es5
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      //使用json-loader处理json文件
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      }
    ]
  },

  //在这里配置所有的plugins
  plugins: [
    new HtmlWebpackPlugin({
      title:"0218",//对应html中的title标签
      filename:"index.html",//生成html文件的名字
      template:"./src/index.html"//参照的模板
    }),
  ]

};

