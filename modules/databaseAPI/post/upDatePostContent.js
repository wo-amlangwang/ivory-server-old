var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var Q = require('q');
var squel = require("squel");

module.exports = {
  upDatePostContent : function(data){
    var ps = new Promise(function(resolve, reject) {
      if(data.id === undefined){
        reject({'reason' : 'need id'});
      }else {
        var post_id = data.id;
        if(data.content === undefined){
          reject({'reason' : ' need content'});
        }else {
          var currentTime = time.getCurrentTime();
          var s = squel.update();
          s.table(base + '.post')
          .set('content',data.content)
          .set('last_update_date',currentTime)
          .where('id=?',post_id);
          var query = s.toString();
          sqlpool.pool.query(query,function (err,result) {
            if(err){
              reject(err);
            }else {
              resolve(result);
            }
          });
        }
      }
    });
    return ps;
  }
}
