var mysql = require('mysql');
var Promise = require('promise');
var base =require('../database_config.json').base;
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var Q = require('q');
var squel = require("squel");

module.exports = {
  postNewPost : function(data){
    var ps = new Promise(function(resolve, reject) {
      var title = data.title;
      if(title === undefined){
        title = null;
      }
      var content = data.content;
      if(content === undefined){
        content = null;
      }
      var currentTime = time.getCurrentTime();
      var last_update_time = currentTime;
      var s = squel.insert();
      s.into(base + '.post')
      .set('title',title)
      .set('content',content)
      .set('date',currentTime)
      .set('last_update_date',last_update_time);
      var query = s.toString();
      sqlpool.pool.query(query,function (err,result,field) {
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
