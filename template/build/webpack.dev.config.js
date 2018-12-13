/**
 * @description 开发环境 
 * @author zhangzhen09
 */


const
    path = require('path'),
    webpack = require('webpack'),
    webpackMerge = require('webpack-merge');

const
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
    AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const
    baseWebpackConfig = require('./webpack.base.config'),
    { nowConfig, commonsChunkName } = require('./util');

const config = nowConfig();

const base = require('../config/base.js')

const commonsChunk = commonsChunkName();

module.exports = webpackMerge(baseWebpackConfig, {
    // devtool: '#cheap-module-eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.env || { 'NODE_ENV': '"development"' }
        }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

        new FriendlyErrorsPlugin()
    ].concat(config.template.map(template => {
        let chunkName = template.split(path.sep).slice(-2)[0];
          //判断是否为单页面应用
        base.isMultiplePage ? chunkName = chunkName : chunkName = 'index'
        return new HtmlWebpackPlugin({
            filename: chunkName + '.html',
            template: template,
            chunks: [chunkName].concat(commonsChunk),
            chunksSortMode: function(chunk1, chunk2) {
                let
                    entrys = Object.keys(config.entry),
                    vendors = commonsChunk;

                let
                    orders = ['manifest'].concat(vendors, entrys),
                    order1 = orders.indexOf(chunk1.names[0]),
                    order2 = orders.indexOf(chunk2.names[0]);

                if (order1 > order2) {
                    return 1;
                } else if (order1 < order2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
    }))
})