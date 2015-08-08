var mysql = require('mysql');
module.exports=function(){
  var buildConnection = function(){
    var connection = mysql.createConnection({
      host      : 'us-cdbr-iron-east-02.cleardb.net',
      user      : 'bb073b07f5136c',
      password  : '9a31dae2'
    });
    connection.connect(function(err){
      if(err){
        console.log('error when connectiong to db : ',err);
        setTimeout(buildConnection,2000);
      }
    });
    connection.on('error',function(err){
      console.log('db error',err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST')
      {
        buildConnection();
      }else{
        throw err;
      }
    });
  }
  return{

  }
}
