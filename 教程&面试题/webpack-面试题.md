###1.webpack的核心概念
	Entry：入口，Webpack进行打包的起始点(文件)
	Output：出口，webpack编译打包生成的bundle(打包文件)
	Loader：模块加载(转换)器，将非js、非json模块包装成webpack能理解的js模块
	Plugin：插件，在 Webpack 构建流程中的特定时机插入具有特定功能的代码
	Module：模块，在 Webpack眼里一切皆模块，默认只识别js文件, 如果是其它类型文件利用对应的loader转换为js模块

###2.webpack配置文件的整体结构
	module.exports = {
	  entry: '', //入口
	  output: {},//输出
	  module: {rules: []},//配置loader
	  plugins: [] //配置plugin
	}

###3.webpack模块化打包的基本流程
	1. 连接: webpack从入口JS开始, 递归查找出所有相关联的模块, 并`连接`起来形成一个图(网)的结构
	2. 编译: 将JS模块中的模块化语法【编译】为浏览器可以直接运行的模块语法(当然其它类型资源也会处理)
	3. 合并: 将图中所有编译过的模块【合并】成一个或少量的几个bundle文件, 浏览器真正运行是打包生成的bundle文件

###4.比较loader与plugin

	1). loader: 用于加载特定类型的资源文件, webpack本身只能打包js。
	2). plugin: 用来扩展webpack其它方面的功能, 一般loader处理不了的资源、完成不了的操作交给插件处理。

###5.区别live-reload（自动刷新加载）与hot-realod/HMR（热模替换）
	相同点: 
		代码修改后都会自动重新编译打包
	不同点: 
		live-reload: 刷新整体页面, 从而查看到最新代码的效果, 页面状态全部都是新的。
		Hot-reload: 没有刷新整个页面, 只是加载了修改模块的打包文件并运行,
		从而更新页面的局部界面, 整个界面的其它部分的状态还在

###6.webpack常用loader与plugin汇总
	
