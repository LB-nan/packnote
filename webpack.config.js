
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
    ],
    module: {
        rules: [
            // {
            //     test:/\.js$/,
            //     use: [{
            //         loader: 'babel-loader'
            //     }]
            // }
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options:{
                        module: true,
                        localIdentName: '[name]_[local]_[hash:base64]'
                    }
                }],
                exclude: [
                    path.resolve(__dirname, 'src/main.css')
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader',{
                    loader:'css-loader',
                    options: [
                        module: true,
                        localIdentName: '[name]_[local]_[hash:base64]'
                    ]
                },'sass-loader']
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'],
                include: [
                    path.resolve(__dirname, 'src/main.css')
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        open: true,
        port: 8085
    }
}