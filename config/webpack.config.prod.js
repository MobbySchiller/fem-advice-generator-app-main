const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        script: './src/index.js',
    },
    output: {
        filename: '[name]-[contenthash:4].js',
        path: path.resolve(__dirname, '../', 'build'),
        assetModuleFilename: 'images/[name][ext][query]'
    },
    devServer: {
        open: true,
        static: path.resolve(__dirname, '../', 'public'),
        port: 5001
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|svg|gif|jpeg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ["@babel/preset-env", { useBuiltIns: 'usage' }]
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/templates/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[contenthash:4].css'
        }),
        new CopyPlugin({
            patterns: [
                { from: "public/images", to: "images" }
            ]
        })
    ]
}