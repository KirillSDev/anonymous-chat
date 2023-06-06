const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    ],
    resolve: {
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

