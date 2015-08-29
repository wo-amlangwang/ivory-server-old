var mysql = require('mysql');
var Promise = require('promise');
var base =require('../database_config.json').base;
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var Q = require('q');
var squel = require("squel");

module.exports = {
  insertNewAnswer : function(data) {

    var ps = new Promise(function(resolve, reject) {
      var s = squel.insert();
      s.into(base + '.answer')
      .set('content',data.content)
      .set('date',time.getCurrentTime())
      .set('last_update_date',time.getCurrentTime());
      var query = s.toString();
      sqlpool.pool.query(query,function(err,result,field) {
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
