var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../../supportfunctions/getTime.js');
var sqlpool = require('../sqlpool.js');
var Q = require('q');
var squel = require("squel");
var upt = require('./upDatePostTitle.js').upDatePostTitle;
var upc = require('./upDatePostContent.js').upDatePostContent;

module.exports = {
  upDatePost : function(data){
    var ps = new Promise(function(resolve, reject) {
      var revalue = [];
      var promises = [];
      promises[0] = upt(data)
      .then(function(result){
        var message = {'result' : 'title update successfully extra informations followed',
                       'reason' : result}
        revalue.push(message);
      })
      .catch(function(err){
        var message = {'result' : 'your title may not change reason followed',
                       'reason' : err}
        revalue.push(message);
      });
      promises[1] = upc(data)
      .then(function(result){
        var message = {'result' : 'content update successfully extra informations followed',
                       'reason' : result}
        revalue.push(message);
      })
      .catch(function(err){
        var message = {'result' : 'your content may not change reason followed',
                       'reason' : err}
        revalue.push(message);
      });
      Q.all(promises).done(function(){
        resolve(revalue);
      });
    });
    return ps;
  }
}
