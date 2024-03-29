/*
This file content 5 API used to modify post table
postNewPost : post new post with title and content in the data
              data is a json object with format:
              {'title' : title,
               'content' : content}
              use current server's time as post create time and last modify time
findPostById : find the post with post id
               return will be a array with json object in it
upDatePostContent : update post's content in data
                    data is a json object with format:
                    {'id' : id,
                     'content' : content}
                    if content or post id is undefined the function will reject
                    the promise
upDatePostTitle : update post's content in data
                  data is a json object with format:
                  {'id' : id,
                   'title' : content}
                  if title or post id is undefined the function will reject
                  the promise
upDatePost : combination of upDatePostTitle & upDatePostContent
*/

// Siyuan : 最好把每一个函数分开成单独的文件

var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../supportfunctions/getTime.js');
var sqlpool = require('./sqlpool.js');
var Q = require('q');
var squel = require("squel");

var upDatePostContent = function(data){
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
        .set('last_updata_date',currentTime)
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

var upDatePostTitle = function(data){
  var ps = new Promise(function(resolve, reject) {
    if(data.id === undefined){
      reject({'reason' : 'need id'});
    }else {
      var post_id = data.id;
      if(data.title === undefined){
        reject({'reason' : 'need title'});
      }else {
        var currentTime = time.getCurrentTime();
        var s = squel.update();
        s.table(base + '.post')
        .set('title',data.title)
        .set('last_updata_date',currentTime)
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
  },
  findPostById : function(id){
    var ps = new Promise(function(resolve, reject) {
      var s = squel.select();
      s.from(base + '.post')
      .where('id=?',id);
      console.log(s.toString());
      var query = s.toString();
      sqlpool.pool.query(query,function(err,result,field){
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
    return ps;
  },
  upDatePostTitle : upDatePostTitle,
  upDatePostContent : upDatePostContent,
  upDatePost : function(data){
    var ps = new Promise(function(resolve, reject) {
      var revalue = [];
      var promises = [];
      promises[0] = upDatePostTitle(data)
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
      promises[1] = upDatePostContent(data)
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
