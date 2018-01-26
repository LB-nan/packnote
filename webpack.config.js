
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js', //入口文件路径
    output: { // 出口文件、编译后的文件存放路径
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    plugins: [
        // 自动生成HTML文件
        new HtmlWebpackPlugin({
            filename: 'cat1.html',
            template: 'src/index.html'
        })
    ]
}