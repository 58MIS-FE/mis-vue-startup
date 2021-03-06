/**
 * @description 基本配置文件 
 * @author zhangzhen09
 */

const
    path = require('path'),
    webpack = require('webpack'),
    Glob = require('glob').Glob;

const
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const { nowConfig, pathJoin } = require('./util');

const config = nowConfig();

/**
 * 获取路径
 * @param {Array} args 
 */
function getPath(...args) {
    return pathJoin(config.assetsRoot, ...args);
}

/**
 * 获取公共打包
 */
function getCommonsChunk() {
    return new Glob('!(_)*/!(_)*.js', {
            cwd: getPath('common'),
            sync: true
        })
        .found
        .map(file => getPath('common', file));
}

const commonsChunk = config.isOpenSyncImport ? {} : Object.assign({
    common: getCommonsChunk()
}, config.commons);

/**
 * 设置打包体积
 */
function getCommonsChunkPluginSetting() {
    return config.isOpenSyncImport ?
        config.minChunkSize ? [
            // 设置chunk的最小大小
            new webpack.optimize.MinChunkSizePlugin({
                minChunkSize: config.minChunkSize || 10000
            })
        ] : [] : [
            // 公用模块抽离
            new webpack.optimize.CommonsChunkPlugin({
                names: ['manifest'].concat(Object.keys(commonsChunk)),
                minChunk: function(module) {
                    return module.context && module.context.index('node_modules') !== -1;
                }
            })
        ]
}

/**
 * 获取CDN资源前缀
 */

function getCdnUrl() {
    return process.env.NODE_ENV == 'production-c' ? config.cdnUrl : config.publicPath;
}

function pathCDNJoin(...args) {
    return process.env.NODE_ENV == 'production-c' ? args.join('/') : path.posix.join(...args);
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [path.resolve(__dirname, '..', 'src')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.showEslintErrorsInOverlay
    }
});


process.env.NODE_ENV === 'production' ? config.publicPath = config.publicPath  : config.publicPath = '/';


module.exports = {
    entry: Object.assign({}, config.entry, commonsChunk),

    output: {
        path: config.buildRoot,
        filename: pathJoin('js', '[name].[hash].js'),
        chunkFilename: pathJoin('js', '[name].[hash].js'),
        publicPath: getCdnUrl()
    },

    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: Object.assign(config.commonAlias, {
            'vue': 'vue/dist/vue.js'
        })
    },

    externals: config.externals,

    module: {
        rules: [
            ...(config.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                fallback: 'vue-style-loader',
                                use: 'css-loader'
                            })
                        }
                    }
                }
            },
            {
                test: /\.js$/,
                include: [
                    config.assetsRoot,
                    path.resolve(__dirname, '..', 'text')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: pathJoin(config.staticAssets, 'img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: pathJoin(config.staticAssets, 'media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: pathJoin(config.staticAssets, 'fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },

    plugins: [
        // 提取css
        new ExtractTextPlugin({
            filename: pathJoin('css', '[name].[hash:8].css')
        }),

        // 检测外部依赖包是否更新
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(`${config.assetsStatic}/libs/js/manifest_vendors.json`)
        }),

        // 插入自定义文件插入到html中
        new AddAssetHtmlPlugin([{
            filepath: pathJoin(config.assetsStatic, 'libs/js/vendors.js'),
            publicPath: pathCDNJoin(getCdnUrl(), config.staticAssets, 'libs/js'),
            outputPath: pathJoin(config.staticAssets, 'libs/js'),
            files: config.libraryEntry.map(entry => entry + '.html'),
            includeSourcemap: false
        }])
    ].concat(getCommonsChunkPluginSetting())
}
