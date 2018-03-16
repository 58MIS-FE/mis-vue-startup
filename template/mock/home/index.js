module.exports = function(app) {
    /**
     * 获取列表信息
     */
    app.get('/api/home/getItem', (req, res) => {
        let list = require('./data/getItem.js');
        res.send(list)
    });
};