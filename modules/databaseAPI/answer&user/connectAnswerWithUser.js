var mysql = require('mysql');
var Promise = require('promise');
var base =require('../database_config.json').base;
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var squel = require("squel");

module.exports = {
  connectAnswerWithUser : function(uid,aid) {
    var ps = new Promise(function(resolve, reject) {
      var s = squel.insert();
      s.into(base + '.answer_user_links')
      .set('user_id',uid)
      .set('answer_id',aid);
      var query = s.toString();
      sqlpool.pool.query(query,function(err,result,fields) {
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
