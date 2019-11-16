const path = require('path');
const glob = require('glob');
const dotenv = require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: ['./src/js/index.js', './src/sass/styles.scss']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: process.env.NODE_ENV === 'production' ? 'js/app.[hash:8].js' : 'js/app.js'
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: process.env.APP_NAME
        }),
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'production' ? 'css/app.[hash:8].css' : 'css/app.css'
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: process.env.NODE_ENV === 'production' ? true : false,
        minimizer: [new TerserPlugin()],
    },
};
