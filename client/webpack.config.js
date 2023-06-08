const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devServer: {
        historyApiFallback: true,
        port: 4500,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new webpack.DefinePlugin({
            'process.env.SOCKET_SERVER_URL': JSON.stringify(process.env.SOCKET_SERVER_URL)
        })
    ],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, 'src/components'),
            "@pages": path.resolve(__dirname, 'src/pages'),
            "@layout": path.resolve(__dirname, 'src/layout'),
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@sockets": path.resolve(__dirname, 'src/sockets'),
            "@interfaces": path.resolve(__dirname, 'src/interfaces'),
            "@store": path.resolve(__dirname, 'src/store'),
        },
        extensions: ['.tsx', '.ts', '.json', '.js'],
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
};

