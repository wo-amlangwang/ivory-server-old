var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../supportfunctions/getTime.js');
var sqlpool = require('./sqlpool.js');

module.exports = {
  findUserByEmail : function(email){
    var ps = new Promise(function(resolve, reject) {
      var query = 'SELECT * FROM ' + base + '.user WHERE email LIKE' + ' \'' + email
                  + '\'';
      sqlpool.pool.query(query,function(err,result,fields){
        if(err){
          reject(err);
        }else {
          resolve(result);
        }
      });
    });
    return ps;
  },
  findUserById : function(id) {
    var ps = new Promise(function(resolve, reject) {
      var query = 'SELECT * FROM ' + base + '.user WHERE id LIKE' + ' \'' + id
                  + '\'';
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
  insertNewUser : function(data) {
    var ps = new Promise(function(resolve, reject) {
      var query = 'INSERT INTO ' + base
          + '.user (email,hashed_pw,pwsalt) VALUES ('+'\''+ data.email
          +'\',\''+ data.hashed_pw +'\',\''+ data.pwsalt +'\')';
      connection.query(query,function(err,result,fields){
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
    return ps;
  }
}
