var mysql = require('mysql');
module.exports = {
  pool : mysql.createPool({
    connectionLimit : 10,
    host      : 'us-cdbr-iron-east-02.cleardb.net',
    user      : 'bb073b07f5136c',
    password  : '9a31dae2'
  })
}