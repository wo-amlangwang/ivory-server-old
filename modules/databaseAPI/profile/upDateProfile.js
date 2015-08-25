var mysql = require('mysql');
var Promise = require('promise');
var base =require('../database_config.json').base;
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var squel = require("squel");
module.exports = {
  upDateProfile : function(data){
    //console.log(data);
    var ps = new Promise(function(resolve, reject) {
      if(data.id === undefined || data.id === null){
        reject({'reason' : 'need id'});
      }else{
        var last_name;
        var first_name;
        var inps = new Promise(function(resolve, reject) {
          var s = squel.select();
          s.from(base + '.profile')
          .where('id=?',data.id);
          var query = s.toString();
          sqlpool.pool.query(query,function(err,rows,fields) {
            last_name = data.last_name;
            first_name = data.first_name;
            if(last_name === undefined || last_name === null){
              last_name = rows[0].last_name;
            }
            if(first_name === undefined || first_name === null){
              first_name = rows[0].first_name;
            }
            if(err){
              reject(err);
            }else {
              resolve();
            }
          });
        });
        //console.log(3231);
        inps.then(function() {
          var s = squel.update();
          s.table(base + '.profile')
          .set('first_name',first_name)
          .set('last_name',last_name)
          .where('id=?',data.id);
          var query = s.toString();
          sqlpool.pool.query(query,function(err,result){
            if(err){
              reject(err);
            }else{
              resolve(result);
            }
          });
        }).catch(function(err) {
          reject(err);
        });
      }
    });
    return ps;
  }
}
