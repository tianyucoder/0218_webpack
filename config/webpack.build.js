//引入extract-text-webpack-plugin插件，提取css为单独文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入clean-webpack-plugin插件，清空指定目录
const CleanWebpackPlugin = require('clean-webpack-plugin')
//引入公共配置文件
const common = require('./webpack.base')
//引入合并库
const merge = require('webpack-merge')

module.exports = merge(common,{

  //配置所有loader
  module: {
    rules: [
      //1.less-loader将less转换为css
      {
        test: /\.less$/, //匹配文件的规则，说明该loader对哪个文件生效
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","less-loader"]
        })
      },
    ]
  },

  //配置所有的plugins
  plugins: [
    //提取css为单独文件
    new ExtractTextPlugin("./css/index.css"),
    new CleanWebpackPlugin()
  ]

})

