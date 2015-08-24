var mysql = require('mysql');
module.exports = {
  // Siyuan: 请使用node ENV环境变量，不要把登录信息存在文件里
  pool : mysql.createPool({
    connectionLimit : 3,
    host      : 'us-cdbr-iron-east-02.cleardb.net',
    user      : 'bb073b07f5136c',
    password  : '9a31dae2'
  })
}
