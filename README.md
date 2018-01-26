# webpack笔记
### 一、打包初尝试
在文件的根目录下创建一个`webpack.config.js`的文件，是webpack的默认配置文件。
1、文件里面写上如下代码

		// path是内置的模块，用于管理路径
		const path = require('path');

		module.exports = {
			//入口文件路径
		    entry: './src/app.js', 

			// 出口文件、编译后的文件存放路径及文件名字
		    output: { 
				//__divname 是当前路径
		        path: path.resolve(__dirname, 'dist'),
		        filename: 'main.js'
		    }
		}
创建完之后安装依赖	。          

2、打开命令行工具/cmd、或者其他的东西，我用的是VScode，打开内置的终端就好了，打开后输入`npm init -y`初始化package.json。

3、然后输入`npm i -D webpack`安装开发依赖，安装完会出来一个名字叫`node_modules`的文件夹，安装好就不要动这个文件夹。

4、打开package.json文件，因为要运行webpack嘛，所以就要设置webpack的运行命令，找到下面的代码块

	"scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	},

在这里添加`"dev":"webpack"`，设置为`webpack`就代表运行的文件为默认的`webpack.config.js`文件，（一般都是这个，就是上面创建的那个文件，不要搞事情），如果你的文件名字不叫这个的话（我就要搞事情），设置成下面的格式
	
	"dev":"webpack --config yourFileName"

5、设置好之后，去命令行工具运行`npm run dev`就打包好了，0.0最简单的打包。注意想测试打包好了的话在HTML里面的路径要修改一下，链接到`main.js`，也就是打包后的js文件。

### 二、体验插件
1、自动生成HTML插件，安装。

	npm i -D html-webpack-plugin

安装完后打开package.json文件会发现多了一个插件

	"devDependencies": {
    	"html-webpack-plugin": "^2.30.1",
    	"webpack": "^3.10.0"
  	}

安装完就要使用，在`webpack.config.js`文件里引入插件`const HtmlWebpackPlugin = require('html-webpack-plugin')`，然后在`module.exports`里面加入新的字段`plugins`，值是一个数组

	 plugins: [
        new HtmlWebpackPlugin()
    ]
	
	//可以自己配置
	plugins: [
        new HtmlWebpackPlugin({
			// 定义生成的文件名字
			filename: 'cat.html',
			// 定义生成的文件的模板
			template: 'src/index.html'
		})
    ]

### 三、loader
loader就是webpack用来预处理模块的，在一个模块被引入之前，会预先使用loader处理模块内容

和配置插件一样，在`webpack.config.js`文件里面配置新的字段。

	module:{
		rules:[{
			// 匹配js后缀的文件
			test: /\.js$/,
			//这里需要用到的一个loader叫做babel-loader需要加载进来
            use: [{
                loader: 'babel-loader'，
				options: {
					// 这个设置根据需求设置
					presets: []
				}
            }]
		}]
	}

加载babel loader

	npm i -D babel-loader babel-core
然后就发现在package.json里面又多了俩新的插件。