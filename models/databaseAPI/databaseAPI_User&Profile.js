var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../supportfunctions/getTime.js');
var sqlpool = require('./sqlpool.js');

module.exports = {
  connectProfileWithUser : function(uid,pid) {
    var ps = new Promise(function(resolve, reject) {
      var query = 'INSERT INTO ' + base
          + '.profile_user_links (user_id,profile_id) VALUES ('+'\''+ uid
          +'\',\''+ pid +'\''+')';
      sqlpool.pool.query(query,function(err,result,fields) {
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
  },
  findPostIdByUserId : function(uid){
    var ps =new Promise(function(resolve, reject) {
      var query = 'SELECT profile_id FROM ' + base +
                  '.profile_user_links WHERE user_id LIKE' + ' \''
                  + uid + '\'';
      sqlpool.pool.query(query,function(err,result,fields){
        if(err){
          reject(err);
        }else {
          resolve(result);
        }
      });
    });
    return ps;
  }
}
