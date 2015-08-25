var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var Q = require('q');
var squel = require("squel");

module.exports = {
  findPostById : function(id){
    var ps = new Promise(function(resolve, reject) {
      var s = squel.select();
      s.from(base + '.post')
      .where('id=?',id);
      console.log(s.toString());
      var query = s.toString();
      sqlpool.pool.query(query,function(err,result,field){
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
