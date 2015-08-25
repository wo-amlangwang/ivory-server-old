var mysql = require('mysql');
var Promise = require('promise');
var base =require('../database_config.json').base;
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var squel = require("squel");

module.exports = {
  connectPostWithUser : function(uid,poid){
    var ps = new Promise(function(resolve, reject) {
      var s = squel.insert();
      s.into(base + '.post_user_links')
      .set('user_id',uid)
      .set('post_id',poid);
      var query = s.toString();
      console.log(query);
      sqlpool.pool.query(query,function(err,result,fields){
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
