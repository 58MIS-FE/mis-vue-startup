/**
 * @description 生产环境webpack配置
 */

const
    path = require('path'),
    webpack = require('webpack'),
    webpackMerge = require('webpack-merge');

const
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CompressionWebpackPlugin = require('compression-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const
    baseWebpackConfig = require('./webpack.base.config'),
    { nowConfig, commonsChunkName } = require('./util');

const config = nowConfig();

const commonsChunk = commonsChunkName();

module.exports = webpackMerge(baseWebpackConfig, {
    devtool: config.sourceMap || false,

    plugins: [
        // 环境变量 update
        new webpack.DefinePlugin({
            'process.env': config.env || { 'NODE_ENV': '"production"' }
        }),

        // banner条
        new webpack.BannerPlugin('版权归MIS-FE所有'),

        // 压缩css
        new OptimizeCSSPlugin(),

        // 变量提升
        new webpack.optimize.ModuleConcatenationPlugin(),

        // 压缩代码
        new UglifyJSPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),

        // 压缩静态资源
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        // 拷贝静态资源
        new CopyWebpackPlugin([{
            from: path.join(config.assetsStatic),
            to: path.join(config.buildRoot, config.staticAssets)
        }]),

        // bundle分析
        // new BundleAnalyzerPlugin()
    ].concat(config.template.map(template => {
        let chunkName = template.split(path.sep).slice(-2)[0];

        return new HtmlWebpackPlugin({
            filename: chunkName + '.html',
            template: template,
            chunks: [chunkName].concat(commonsChunk),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            showErrors: true,
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
});