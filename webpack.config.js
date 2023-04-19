// @ts-nocheck
/* eslint-disable no-undef */
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    plugins: [
        new ESLintPlugin(),
        new FileManagerPlugin({
            events: {
                onStart: {
                    copy: [
                        { source: './src/assets', destination: './dist' },
                        { source: './html/src/views/pages', destination: './dist/' }
                    ],
                    delete: ['./html']
                }
            }
        }),
        new HtmlPlugin({
            template: 'dist/index.html'
        })
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.[fullhash].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
