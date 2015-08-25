var mysql = require('mysql');
module.exports = {
  pool : mysql.createPool({
    connectionLimit : 3,
    host      :  process.env.dbhost,
    user      :  process.env.dbuser,
    password  :  process.env.dbpassword
  })
}
