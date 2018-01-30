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

5、在这里添加`"dev":"webpack"`，设置为`webpack`就代表运行的文件为默认的`webpack.config.js`文件，（一般都是这个，就是上面创建的那个文件，不要搞事情），如果你的文件名字不叫这个的话（我就要搞事情），设置成下面的格式
	
	"dev":"webpack --config yourFileName"

6、设置好之后，去命令行工具运行`npm run dev`就打包好了，0.0最简单的打包。注意想测试打包好了的话在HTML里面的路径要修改一下，链接到`main.js`，也就是打包后的js文件。

### 二、体验插件
1、自动生成HTML插件，安装。

	npm i -D html-webpack-plugin

2、安装完后打开package.json文件会发现多了一个插件

	"devDependencies": {
    	"html-webpack-plugin": "^2.30.1",
    	"webpack": "^3.10.0"
  	}

3、安装完就要使用，在`webpack.config.js`文件里引入插件`const HtmlWebpackPlugin = require('html-webpack-plugin')`，然后在`module.exports`里面加入新的字段`plugins`，值是一个数组

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
1、loader就是webpack用来预处理模块的，在一个模块被引入之前，会预先使用loader处理模块内容

2、和配置插件一样，在`webpack.config.js`文件里面配置新的字段。

	module:{
		rules:[{
			// 匹配js后缀的文件
			test: /\.js$/,
			//这里需要用到的一个loader叫做babel-loader需要加载进来
            use: [{
                loader: 'babel-loader'，
				options: {
					// 这个设置根据需求设置，根据需求下载插件
					presets: []
				}
            }]
		}]
	}

3、加载babel loader

	npm i -D babel-loader babel-core
4、然后就发现在package.json里面又多了俩新的插件。

### 四、devserver
1、安装

	npm i -D webpack-dev-server
2、在`package.json`里面添加字段

	"server": "start-dev-server"
3、如果设置默认的不是`webpack.config.js`文件，`"dev": "webpack",`这里如果设置的是别的名字，例如我前面那行代码`"dev":"webpack --config yourFileName"`就需要在字段里面也设置配置文件

	"server": "start-dev-server --config yourFileName"

4、然后就允许了，默认的是`http://localhost:8080/`，然后运行之后会把文件打包，文件打包后会放到内存里面。

5、配置，在`webpack.config.js`里面添加新的字段，

	devServer: {
		// 自动打开浏览器
        open: ture,
		// 设置端口
        port: 8085
    }


### 五、引入CSS
1、先`npm i` 把配置文件里面声明的东西都下载下来，如果已经下载就略过

2、在入口文件里面引入css文件，自行新建css文件，`import './main.css'` 

3、安装css loader  

	npm i -D css-loader

4、配置文件，在`webpack.config.js`文件里面`module`下的`rules`里面添加一个对象，

	{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
    }

5、cssloader处理完成之后需要styleloader接手插入到结构里面

	npm i -D style-loader

### 6、CSS引入图片——file-loader
1、安装file-loader

	npm i -D file-loader

2、安装好之后配置文件，在`webpack.config.js`文件里面`module`下的`rules`里面添加一个对象

	{
        test: /\.jpg$/,
        use: [ 'file-loader' ]
    }

### 7、url loader
1、安装插件

	npm i -D url-loader

2、url-loader会把图片编码成base64格式，因为图片太大的话转码有点得不偿失，所以用url loader的时候需要进行一些配置

	{
        test: /\.(jpg|png|gif)$/,
        use: [{
			loader: 'url-loader',
			options: {
				// 大于10000b 大约10KB的文件进行请求，小于10000b的文件进行转码
				limit: 10000
			}
		}]
    }

### 8、引入字体
1、使用file loader处理，配置位置是老位置。

	{
        test: /\.(ttf|svg|eot)$/,
        use: [ 'file-loader' ]
    }

### 9、CSS模块化
1、需要配置css-loader

	use: ['style-loader', {
        loader: 'css-loader',
        options:{
            module: true,
			// 
			localIdentName:
        }
    }]

localIdentName：'[hash:base64]';控制编码后的名称，默认 [hash:base64]，可以设置字符串作为固定值(`[hash:base64]`这样的写法也是在引号里面,可以设置长度`[hash:base64:6]`)，不过一般不这样搞，他有几个参数分别代表不同的意思,`[path]`路径、`[name]`文件名字、`[local]`类名

options里面的module默认是false，不开启模块化，设置为true就开启了。

设置为模块化之后，引入的css文件都变成了模块，需要用模块的语法引入。

	import cat from './cat.css'

然后`cat`就变成了一个对象，HTML结构需要用cat的话需要重新设置，因为webpack会把类名什么的重新编译，所以看情况用吧。

一些时候我们并不想让所有文件都模块化，这个时候就得重新设置我们的webpack设置了,设置忽略的路径，不过忽略了之后导入就会失效，所以后面还需要重新再写一条规则

	 {
	    test: /\.css$/,
	    use: ['style-loader', {
	        loader: 'css-loader',
	        options:{
	            module: true
	        }
	    }],
		exclude: [
            path.resolve(__dirname, 'src/main.css')
        ]
	},
	{
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
		include: [
            path.resolve(__dirname, 'src/main.css')
        ]
    }

### 10、scss less
1、sass 想用需要先安装loader

	npm i -D sass-loader node-sass

配置文件，webpack配置是从后往前执行的，配置的顺序不可以错。

	 {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
    }
如果想配置模块化需要设置`css-loader`，然后模块化之后引入方式也得变。

	{
        test: /\.scss$/,
        use: ['style-loader',{
            loader:'css-loader',
            options: [
                module: true,
                localIdentName: '[name]_[local]_[hash:base64]'
            ]
        },'sass-loader']
    }

2、 less 

	npm i -D less-loader less

## babel
1、官网 https://babeljs.cn/

安装

	npm install --save-dev babel-cli

初始化一下，package.json

	npm init

使用

在package.json里面找到`scripts`，添加新的字段,名字随意填，执行命令的路径是看具体情况，关键字`-o`后面加路径表示要编译的位置

	"name": "babel src/app.js -o out/a.js"

2、babel的插件之一：arrow functions  

下载

	npm install --save-dev babel-plugin-transform-es2015-arrow-functions

然后把上面设置的那个修改一下

	//原来的
	"name": "babel src/app.js"
	//修改后
	 "babel": "babel --plugins transform-es2015-arrow-functions src/app.js"
	
3、babel的插件之二：classes，处理class语法的

下载

	npm install --save-dev babel-plugin-transform-es2015-classes

4、如果插件太多一直这样不现实，有一个解决办法`babelrc`，官网有文档，新建一个`.babelrc`的文件，配置，然后还有一个东西叫做预设，把相关联的插件打包然后一起下载，比如ES6语法编译成ES5语法的所有插件打了个包。

4.1 babelrc的配置

	{
	    "plugins": [
	        "transform-es2015-arrow-functions",
	        "transform-es2015-classes"
	    ]
	}
4.2 预设

	npm install --save-dev babel-cli babel-preset-es2015

然后配置`babelrc`
	
	{ "presets": ["es2015"] }

	



