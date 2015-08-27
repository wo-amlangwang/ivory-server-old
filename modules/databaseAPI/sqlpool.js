var mysql = require('mysql');
module.exports = {
  pool : mysql.createPool({
    connectionLimit : 3,
    host      :  process.env.dbhost || 'us-cdbr-iron-east-02.cleardb.net',
    user      :  process.env.dbuser || 'bb073b07f5136c',
    password  :  process.env.dbpassword || '9a31dae2'
  })
}
