var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
/**
APIs:
findUserByEmail
findUserById
insertNewUser
insertNewProfile
findProfileById
connectProfileWithUser
findProfileIdByUserId
upDateProfile
**/
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
    return connection;
  }
  return{
    findUserByEmail : function(email){
      var ps = new Promise(function(fullfill,reject){
        var connection = buildConnection();
        var query = 'SELECT * FROM ' + base + '.user WHERE email LIKE' + ' \'' + email
                    + '\'';
        connection.query(query,function(err,rows,fields){
          if(err){
            reject(err);
          }else {
            fullfill(rows);
          }
        });
        connection.end();
      });
      return ps;
    },
    findUserById : function(id){
      var ps = new Promise(function(fullfill,reject){
        var connection = buildConnection();
        var query = 'SELECT * FROM ' + base + '.user WHERE id LIKE' + ' \'' + id
                    + '\'';
        connection.query(query,function(err,rows,fields){
          if(err){
            reject(err);
          }else{
            fullfill(rows);
          }
        });
        connection.end();
      });
      return ps;
    },/**
    data format{
    email : string
    hashed_pw : string
    pwsalt : string
    }
    **/
    insertNewUser : function(data){
      var ps = new Promise(function(fullfill,reject){
        var connection = buildConnection();
        var query = 'INSERT INTO ' + base
            + '.user (email,hashed_pw,pwsalt) VALUES ('+'\''+ data.email
            +'\',\''+ data.hashed_pw +'\',\''+ data.pwsalt +'\')';
        connection.query(query,function(err,result,fields){
          if(err){
            reject(err);
          }else{
            fullfill(result);
          }
        });
        connection.end();
      });
      return ps;
    },
    upDateProfile : function(data){
      var ps = new Promise(function(fullfill,reject){
        if(data.id === undefined || data.id === null){
          reject({'reason' : 'need id'});
        }else{
          var last_name = data.last_name;
          var first_name = data.first_name;
          var connection = buildConnection();
          var query = 'UPDATE '+ base + '.profile SET first_name = ' + '\'' +
                      first_name + '\' , last_name = ' + '\'' + last_name + '\'' +
                      ' WHERE id = ' + '\'' + data.id + '\'';
          console.log(query);
          connection.query(query,function(err,result){
            if(err){
              reject(err);
            }else{
              fullfill(result);
            }
          });
          connection.end();
        }
      });
      return ps;
    },
    findProfileById : function(id){
      var ps = new Promise(function(fullfill,reject){
        var connection = buildConnection();
        var query = 'SELECT * FROM ' + base + '.profile WHERE id LIKE' + ' \''
                    + id + '\'';
        connection.query(query,function(err,rows,fields){
          if(err){
            reject(err);
          }else{
            fullfill(rows);
          }
        });
        connection.end();

      });
      return ps;
    },
    insertNewProfile : function(){
      var ps = new Promise(function(fullfill,reject){
        var connection = buildConnection();
        var query = 'INSERT INTO ' + base
            + '.profile (last_name,first_name) VALUES (NULL,NULL)';
        connection.query(query,function(err,result,fields) {
          if(err){
            reject(err);
          }else{
            fullfill(result);
          }
        });
        connection.end();
      });
      return ps;
    },
    connectProfileWithUser : function(uid,pid){
      var ps = new Promise(function(fullfill,reject){
        var connection = buildConnection();
        var query = 'INSERT INTO ' + base
            + '.profile_user_links (user_id,profile_id) VALUES ('+'\''+ uid
            +'\',\''+ pid +'\''+')';
        connection.query(query,function(err,result,fields) {
          if(err){
            reject(err);
          }else{
            fullfill(result);
          }
        });
        connection.end();
      });
      return ps;
    },
    findProfileIdByUserId : function(user_id){
      var ps = new Promise(function(fullfill,reject){
        var connection = buildConnection();
        var query = 'SELECT profile_id FROM ' + base + '.profile_user_links WHERE user_id LIKE' + ' \''
                    + user_id + '\'';
        connection.query(query,function(err,result,fields){
          if(err){
            reject(err);
          }else {
            fullfill(result);
          }
        });
        connection.end();
      });
      return ps;
    }
  }
}
