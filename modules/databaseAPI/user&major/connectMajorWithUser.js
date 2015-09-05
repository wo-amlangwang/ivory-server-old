var mysql = require('mysql');
var Promise = require('promise');
var base =require('../database_config.json').base;
var sqlpool = require('../sqlpool.js');
var squel = require("squel");

module.exports = {
  connectMajorWithUser : function(uid,mid) {
    var ps = new Promise(function(resolve, reject) {
      var s = squel.insert();
      s.into(base + '.user_major_links')
      .set('user_id',uid)
      .set('major_id',mid);
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
