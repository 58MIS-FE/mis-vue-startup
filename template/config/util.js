/**
 * @description util工具集
 */

function mapObject(obj, fun) {
    let result = {};

    Object
        .keys(obj)
        .forEach(key => {
            let rt = fun(obj[key], key);

            if (rt) result[key] = rt;
        });

    return result;
}

function arrToObj(arr, fun) {
    let result = {};

    arr.forEach((val, idx) => {
        let rt = fun(val, idx);

        if (rt) result[val] = rt;
    });

    return result;
}

module.exports = {
    mapObject,
    arrToObj
}