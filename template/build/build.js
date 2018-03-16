/**
 * @description build
 */

const
    path = require('path'),
    ora = require('ora'),
    rm = require('rimraf');

const config = require('../config');

const webpackConfig = require('./webpack.prod.config');

let webpackCompile = require('./util').webpackCompile;

let spinner = ora(`buildding for ${process.env.NODE_ENV}...\n`);

spinner.start();

rm(config.build.buildRoot, err => {
    if (err) throw err;

    spinner.text = `webpack build...`;

    webpackCompile(webpackConfig, () => {
        spinner.stop();
    })
});