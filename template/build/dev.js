/**
 * @description dev
 */

let path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    proxyMiddleware = require('http-proxy-middleware'),
    chalk = require('chalk'),
    opn = require('opn');

let config = require('../config').dev,
    pageUrl = config.pageUrl,
    app = express();

if (config.isMultiplePage) {
    Object.keys(pageUrl).forEach(function(item) {
        app.get(item, (req, res) => {
            res.sendFile(pageUrl[item]);
        })
    });
}

const webpackConfig = require('./webpack.dev.config');

const port = process.env.PORT || config.port || 4001,
    url = `http://localhost:${port}`;

function addHRM(entry) {
    let result = {};

    Object.keys(entry).forEach(key => {
        result[key] = [
            path.resolve(__dirname, './dev-client')
        ].concat(entry[key]);
    });

    return result;
}

webpackConfig.entry = addHRM(webpackConfig.entry);

const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.publicPath,
    noInfo: false,
    stats: {
        colors: true,
        chunks: false,
        modules: false,
        reasons: true,
        errorDetails: true
    }
});

devMiddleware.waitUntilValid(() => {
    console.log(chalk.yellow(`\n\nStarting server on ${url}`));
    config.autoOpenBrowser && opn(url);
});

const hotMiddleware = webpackHotMiddleware(compiler);

compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
        hotMiddleware.publish({ action: 'reload' });
        callback();
    })
});

Object.keys(config.proxy).forEach(key => app.use(key, proxyMiddleware(config.proxy[key])));

app.use('/', express.static(path.resolve(__dirname, config.assetsRoot)));
app.use(devMiddleware);
app.use(hotMiddleware);

module.exports = app.listen(port, err => {
    if (err) {
        console.log(chalk.red(err.toString()));
    } else {
        console.log(chalk.green('dev server was opening.'));
    }
});