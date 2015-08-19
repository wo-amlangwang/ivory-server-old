var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../supportfunctions/getTime.js');
var sqlpool = require('./sqlpool.js');
module.exports = {
  connectPostWithUser : function(uid,poid){
    var ps = new Promise(function(resolve, reject) {
      var query = 'INSERT INTO ' + base
          + '.post_user_links (user_id,post_id) VALUES ('+'\''+ uid
          +'\',\''+ poid +'\''+')';
      sqlpool.pool.query(query,function(err,result,fields){
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
    return ps;
  },
  findPostIdByUserId : function(uid){
    var ps = new Promise(function(resolve, reject) {
      var query = 'SELECT post_id FROM ' + base + '.post_user_links WHERE user_id LIKE' + ' \''
                  + uid + '\'';
      sqlpool.pool.query(query,function(err,result,field){
        if(err){
          reject(err);
        }else {
          resolve(result);
        }
      });
    });
    return ps;
  },
  findUserIdByPostId : function(poid){
    var ps = new Promise(function(resolve, reject) {
      var query = 'SELECT user_id FROM ' + base + '.post_user_links WHERE post_id LIKE' + ' \''
                  + poid + '\'';
      sqlpool.pool.query(query,function(err,rows,field){
        if(err){
          reject(err);
        }else {
          resolve(rows);
        }
      });
    });
    return ps;
  }
}
