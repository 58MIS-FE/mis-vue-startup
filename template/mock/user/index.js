module.exports = function(app) {
    //登录
    let loginObj = require('./data/login.js');
    app.get('/api/user/login', (req, res) => {
        res.send(loginObj)
    });

    //获取 登录信息
    let infoObj = require('./data/info.js');
    app.get('/api/user/info', (req, res) => {
        res.send(infoObj)
    });

    //退出
    app.post('/api/user/logout', (req, res) => {
        let data = require('./data/logout.js');
        res.send(data);
    });
};