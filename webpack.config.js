const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: {
        popup: './src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                  }
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve('manifest.json'),
                to: path.resolve('dist')
            }]
        })
    ],
    devServer: {
        static: './dist',
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    }
};