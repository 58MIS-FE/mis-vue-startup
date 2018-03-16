/**
 * @description webpack配置
 */

const
    path = require('path'),
    Glob = require('glob').Glob,
    base = require('./base');

let { mapObject, arrToObj } = require('./util');

function getPath(...args) {
    return path.join(base.assetsRoot, ...args);
}

function getEntrySetting() {
    let result = {
        entry: {},
        template: []
    };

    new Glob('!(_)*/!(_)*.html', {
            cwd: getPath('./'),
            sync: true
        })
        .found
        .forEach(file => {
            let pageName = file.split('/')[0];

            result.entry[pageName] = getPath(pageName, 'index.js');
            result.template.push(getPath(file));
        });

    return result;
}

let setting = getEntrySetting();

let baseConfig = Object.assign({}, base, {
    entry: base.isMultiplePage ? setting.entry : { index: getPath('index/js/index.js') },
    template: base.isMultiplePage ? setting.template : [getPath('index/index.html')],
    outputPath: base.buildRoot,
    commonAlias: mapObject(base.commonAlias, value => getPath(value))
});

module.exports = {
    build: Object.assign({
        sourceMap: '#source-map'
    }, baseConfig),
    'build:d': Object.assign({
        sourceMap: '#source-map'
    }, baseConfig),
    'build:c': Object.assign({
        sourceMap: '#source-map'
    }, baseConfig),
    dev: Object.assign({}, baseConfig)
}