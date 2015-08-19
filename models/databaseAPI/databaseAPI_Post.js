var mysql = require('mysql');
var Promise = require('promise');
var base ='heroku_1024a2f8499bceb';
var time = require('../supportfunctions/getTime.js');
var sqlpool = require('./sqlpool.js');
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
      var last_updata_time = currentTime;
      var query = 'INSERT INTO ' + base + '.post (title,content,date,last_updata_date) VALUES ('
                  +'\'' + title + '\',\'' + content + '\',\'' + currentTime + '\',\''+ last_updata_time + '\')';
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
    var ps = new new Promise(function(resolve, reject) {
      var query = 'SELECT * FROM ' + base + '.post WHERE id LIKE' + ' \''
                  + id + '\'';
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
  upDatePostTitle : function(data){
    var ps = new Promise(function(resolve, reject) {
      if(data.id === undefined){
        reject({'reason' : 'need id'});
      }else {
        var post_id = data.id;
        if(data.title === undefined){
          reject({'reason' : 'need title'});
        }else {
          var currentTime = time.getCurrentTime();
          var query = 'UPDATE ' + base + '.post SET title = ' + '\'' + data.title
                      + '\', last_updata_date = \'' + currentTime + '\''
                      + 'WHERE id = ' + '\'' + post_id + '\'';
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
  },
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
        }
        var query = 'UPDATE ' + base + '.post SET content = ' + '\'' + data.content
                    + '\', last_updata_date = \'' + currentTime + '\''
                    + 'WHERE id = ' + '\'' + post_id + '\'';
        sqlpool.pool.query(query,function (err,result) {
          if(err){
            reject(err);
          }else {
            resolve(result);
          }
        });
      }
    });
    return ps;
  }
}
/*
var ps = new Promise(function(fullfill,reject){
  var connection = buildConnection();
  if(data.id === undefined){
    reject({'reason' : 'need id'});
  }else{
    var post_id = data.id;
    if(data.content === undefined){
      reject({'reason' : ' need content'});
    }else {
      var date = time.getCurrentTime();
      var query = 'UPDATE ' + base + '.post SET content = ' + '\'' + data.content
                  + '\', last_updata_date = \'' + date + '\''
                  + 'WHERE id = ' + '\'' + post_id + '\'';
      connection.query(query,function (err,result) {
        if(err){
          reject(err);
        }else {
          fullfill(result);
        }
      });
    }
  }
  connection.end();
});
return ps;
*/
/*

postNewPost : function(data){
  var ps = new Promise(function(fullfill,reject){
    var connection = buildConnection();
    var title = data.title;
    if(title === undefined){
      title = null;
    }
    var content = data.content;
    if(content === undefined){
      content = null;
    }
    var date = time.getCurrentTime();
    var last_updata_date = date;
    var query = 'INSERT INTO ' + base + '.post (title,content,date,last_updata_date) VALUES ('
                +'\'' + title + '\',\'' + content + '\',\'' + date + '\',\''+ last_updata_date + '\')';
    connection.query(query,function(err,result,field){
      if(err){
        reject(err);
      }else {
        fullfill(result);
      }
    });
    connection.end();
  });
  return ps;
},
findPostById : function(id){
  var ps = new Promise(function(fullfill,reject){
    var connection = buildConnection();
    var query = 'SELECT * FROM ' + base + '.post WHERE id LIKE' + ' \''
                + id + '\'';
    connection.query(query,function(err,rows,fields){
      if(err){
        reject(err);
      }else{
        fullfill(rows);
      }
    });
    connection.end();

  });
  return ps;
},
connectPostWithUser : function(uid,poid){
  var ps = new Promise(function(fullfill,reject){
    var connection = buildConnection();
    var query = 'INSERT INTO ' + base
        + '.post_user_links (user_id,post_id) VALUES ('+'\''+ uid
        +'\',\''+ poid +'\''+')';
    connection.query(query,function(err,result,fields) {
      if(err){
        reject(err);
      }else{
        fullfill(result);
      }
    });
    connection.end();
  });
  return ps;
},
findPostIdByUserId : function(user_id){
  var ps = new Promise(function(fullfill,reject){
    var connection = buildConnection();
    var query = 'SELECT post_id FROM ' + base + '.post_user_links WHERE user_id LIKE' + ' \''
                + user_id + '\'';
    connection.query(query,function(err,rows,field){
      if(err){
        reject(err);
      }else {
        fullfill(rows);
      }
    });
    connection.end();
  });
  return ps;
},
findUserIdByPostId : function(post_id){
  var ps = new Promise(function(fullfill, reject) {
    var connection = buildConnection();
    var query = 'SELECT user_id FROM ' + base + '.post_user_links WHERE post_id LIKE' + ' \''
                + post_id + '\'';
    connection.query(query,function(err,rows,field){
      if(err){
        reject(err);
      }else {
        fullfill(rows);
      }
    });
    connection.end();
  });
  return ps;
},
upDatePostContent : function(data){
  var ps = new Promise(function(fullfill,reject){
    var connection = buildConnection();
    if(data.id === undefined){
      reject({'reason' : 'need id'});
    }else{
      var post_id = data.id;
      if(data.content === undefined){
        reject({'reason' : ' need content'});
      }else {
        var date = time.getCurrentTime();
        var query = 'UPDATE ' + base + '.post SET content = ' + '\'' + data.content
                    + '\', last_updata_date = \'' + date + '\''
                    + 'WHERE id = ' + '\'' + post_id + '\'';
        connection.query(query,function (err,result) {
          if(err){
            reject(err);
          }else {
            fullfill(result);
          }
        });
      }
    }
    connection.end();
  });
  return ps;
},
upDatePostTitle : function(data){
  var ps = new Promise(function(fullfill,reject){
    var connection = buildConnection();
    if(data.id === undefined){
      reject({'reason' : 'need id'});
    }else{
      var post_id = data.id;
      if(data.title === undefined){
        reject({'reason' : ' need title'});
      }else {
        var date = time.getCurrentTime();
        var query = 'UPDATE ' + base + '.post SET title = ' + '\'' + data.title
                    + '\', last_updata_date = \'' + date + '\''
                    + 'WHERE id = ' + '\'' + post_id + '\'';
        connection.query(query,function (err,result) {
          if(err){
            reject(err);
          }else {
            fullfill(result);
          }
        });
      }
    }
    connection.end();
  });
  return ps;
}*/
