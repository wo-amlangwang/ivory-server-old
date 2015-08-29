var mysql = require('mysql');
var Promise = require('promise');
var base =require('../database_config.json').base;
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var Q = require('q');
var squel = require("squel");

module.exports = {
	updateAnswers:function(data) {
		var ps = new Promise(function(resolve, reject) {
			if(data.id === undefined){
        reject({'reason' : 'need id'});
      } else {
      	var answer_id = data.id;
      	if (data.content === undefined) {
      		reject({'reason' : 'need content'});
      	} else {
      		var s = squel.update();
      		console.log(data.content);
      		console.log(time.getCurrentTime());
      		console.log(answer_id);
      		console.log(base+'.answer');
      		s.table(base + '.answer');
      		console.log(1);
          s.set('content',data.content);
          console.log(1);
          s.set('last_update_date',time.getCurrentTime());
          console.log(1);
          s.where('id=?',answer_id);
          console.log(1);
          console.log(s);
          
          console.log(s.toString());
          
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