var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../supportfunctions/getTime.js');
var sqlpool = require('./sqlpool.js');

module.exports = {
  insertNewProfile : function(data){
    var ps = new Promise(function(resolve, reject) {
      var query = 'INSERT INTO ' + base
          + '.profile (last_name,first_name) VALUES (NULL,NULL)';
      sqlpool.pool.query(query,function(err,result,fields) {
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
    return ps;
  },
  findProfileById : function(id){
    var ps = new Promise(function(resolve, reject) {
      var query = 'SELECT * FROM ' + base + '.profile WHERE id LIKE' + ' \''
                  + id + '\'';
      sqlpool.pool.query(query,function(err,rows,fields){
        if(err){
          reject(err);
        }else{
          fullfill(rows);
        }
      });
    });
    return ps;
  },
  upDateProfile : function(data){
    var ps = new Promise(function(resolve, reject) {
      if(data.id === undefined || data.id === null){
        reject({'reason' : 'need id'});
      }else{
        var last_name = data.last_name;
        var first_name = data.first_name;
        var query = 'UPDATE '+ base + '.profile SET first_name = ' + '\'' +
                    first_name + '\' , last_name = ' + '\'' + last_name + '\'' +
                    ' WHERE id = ' + '\'' + data.id + '\'';
        sqlpool.pool.query(query,function(err,result){
          if(err){
            reject(err);
          }else{
            resolve(result);
          }
        });
      }
    });
    return ps;
  }
}
