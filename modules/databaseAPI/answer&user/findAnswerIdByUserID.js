var mysql = require('mysql');
var Promise = require('promise');
var base =require('../database_config.json').base;
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var squel = require("squel");

module.exports = {
  findAnswerIdByUserId : function(uid) {
    var ps = new Promise(function(resolve, reject) {
      var s = squel.select();
      s.from(base + '.answer_user_links')
      .where('user_id=?',uid);
      var query = s.toString();
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
