let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let chalk = require('chalk');

// app.set('port', process.env.PORT || 1111); // 设定监听端口

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//用户权限
let user = require('./user');
user(app);

//首页
let home = require('./home');
home(app);

//启动监听
app.listen(1111, () => {
    console.log(chalk.red('Express mock server listening on port 1111'));
});