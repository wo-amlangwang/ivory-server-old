var database = require('../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../modules/passwordhasher/passwordhasher.js')();
var token = require('../modules/tokenmaker/tokenmaker.js')();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Promise = require('promise');
var Q = require('q');
var http = require('http').Server(app);
var serverSupport = require('./server_support.js');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.send('welcome,ivory-server,test api in /signin');
});
/*
route table :
/ : homepage(only get allowed)
/signin : get return a signin page
          post build a new user
/authentication : get return a login page
                  post will check the information of the user
*/
app.get('/signin',function(request,response) {
  response.sendFile(__dirname + '/htmls/signin.html');
});
app.post('/signin', function(request,response){
  var email = request.body.email;
  var password = request.body.password;
  database.user.findUserByEmail(email).then(function(rows) {
    if(rows[0] != null){
      response.status(409).send({'reason' : 'user excist'});
    }else{
      hasher.makeHash(password).then(function(result) {
        var user_info = {'email' : email,
                         'hashed_pw' : result.hashed_pw,
                         'pwsalt' : result.pwsalt};
        database.user.insertNewUser(user_info).then(function(result){
          token.makeToken({'id' : result.insertId}).then(function(thistoken){
            response.status(200).send({'reason' : 'ok',
                                       'token' : thistoken.token});
          }).catch(function(err){
            response.status(503).send({'reason' : err});
          });
        });
      }).catch(function(err){
        response.status(503).send({'reason' : err});
      });
    }
  }).catch(function(err){
    response.status(503).send({'reason' : err});
  });

});

app.get('/authentication',function(request,response) {
  response.sendFile(__dirname + '/htmls/login.html');
});
app.post('/authentication',function(request,response) {
  var email = request.body.email;
  var password = request.body.password;
  database.user.findUserByEmail(email).then(function(rows) {
    if(rows[0] != null){
      hasher.comparePassword(password,rows[0]).then(function(result) {
        token.makeToken({'id' : rows[0].id}).then(function(thistoken){
          response.status(200).send({'reason' : 'ok',
                                'token' : thistoken.token});
        }).catch(function(err){
          response.status(503).send({'reason' : err});
        });
      }).catch(function(err) {
        response.status(401).send({'reason' : 'incorrect username or password',
                              'token' : null});
      });
    }else {
      response.status(401).send({'reason' : 'incorrect username or password',
                            'token' : null});
    }
  }).catch(function(err) {
    response.status(503).send({'reason' : err});
  });
});

app.get('/user',function(request,response) {
  var thistoken = request.body.token || request.query.token
              || request.headers['x-access-token'];
  if(thistoken === undefined || thistoken === null){
    response.status(401).send({'reason' : 'need token'});
  }else{
    token.verToken(thistoken).then(function(decoded){
      var userid = decoded.id;
      database.userProfileLinks.findProfileIdByUserId(userid).then(function(rows){
        if(rows[0] != null){
          database.profile.findProfileById(rows[0].profile_id).then(function(rows){
            response.status(200).send(rows[0]);
          });
        }else {
          database.profile.insertNewProfile().then(function(result) {
            var pid = result.insertId;
            database.userProfileLinks.connectProfileWithUser(userid,pid).then(function(argument) {
              response.status(200).send({'first_name' : null,'last_name' : null});
            });
          });
        }
      }).catch(function(err){
        response.status(503).send({'reason' : err});
      });
    }).catch(function(err){
      response.status(401).send({'reason' : err});
    });
  }
});
app.post('/user',function(request,response) {
  var thistoken = request.body.token || request.query.token
              || request.headers['x-access-token'];
  if(thistoken === undefined || thistoken === null){
    response.status(401).send({'reason' : 'need token'});
  }else {
    token.verToken(thistoken).then(function(decoded) {
      var userid = decoded.id;
      database.userProfileLinks.findProfileIdByUserId(userid).then(function(rows){
        if(rows[0] != null){
          var data = {'id' : rows[0].profile_id,
                      'last_name' : request.body.last_name,
                      'first_name' : request.body.first_name};
          database.profile.upDateProfile(data).then(function() {
            response.status(200).send({'reason' : 'ok'});
          }).catch(function(err) {
            response.status(503).send({'reason' : err});
          });
        }else {
          database.profile.insertNewProfile().then(function(result) {
            var pid = result.insertId;
            database.userProfileLinks.connectProfileWithUser(userid,pid).then(function(argument) {
              var data = {'id' : pid,
                          'last_name' : request.body.last_name,
                          'first_name' : request.body.first_name};
              database.profile.upDateProfile(data).then(function() {
                response.status(200).send({'reason' : 'ok'});
              }).catch(function(err) {
                response.status(503).send({'reason' : err});
              });
            }).catch(function(err) {
              response.status(503).send({'reason' : err});
            });
          }).catch(function(err) {
            response.status(503).send({'reason' : err});
          });
        }
      }).catch(function(err) {
        response.status(503).send({'reason' : err});
      });
    }).catch(function(err) {
      response.status(401).send({'reason' : err});
    });
  }
});

app.post('/user/post',function(request,response){
  var thistoken = request.body.token || request.query.token
              || request.headers['x-access-token'];
  if(thistoken === undefined || thistoken === null){
    response.status(401).send({'reason' : 'need token'});
  }else{
    token.verToken(thistoken).then(function(decoded) {
      var userid = decoded.id;
      database.poster.postNewPost({'title' : request.body.title,
                                 'content' : request.body.content})
      .then(function(result) {
        database.posterUserLinks.connectPostWithUser(userid,result.insertId).then(function(argument) {
          response.status(200).send({'reason' : 'ok'});
        });
      })
      .catch(function(err) {
        response.status(503).send({'reason' : err});
      });
    }).catch(function(err) {
      response.status(401).send({'reason' : err});
    });
  }
});
app.get('/user/post',function(request,response) {
  var thistoken = request.body.token || request.query.token
              || request.headers['x-access-token'];
  if(thistoken === undefined || thistoken === null){
    response.status(401).send({'reason' : 'need token'});
  }else{
    token.verToken(thistoken).then(function(decoded) {
      var user_id = decoded.id;
      serverSupport.getAllpostWithUserid(user_id).then(function(posts) {
        response.status(200).send({'reason' : 'ok',
                                   'posts' : posts});
      }).catch(function(err) {
        response.status(503).send({'reason' : err});
      });
    }).catch(function(err) {
      response.status(401).send({'reason' : err});
    });
  }

});
app.get('/user/post/:poid',function(request,response) {
  var thistoken = request.body.token || request.query.token
              || request.headers['x-access-token'];
  var editable = false;
  if(thistoken === undefined || thistoken === null){
    editable = false;
    serverSupport.emitGetpostWithpoid(request,response,editable);
  }else {
    var prom = token.verToken(thistoken)
    prom.then(function(decoded) {
      var userid = decoded.id;
      database.posterUserLinks.findUserIdByPostId(request.params.poid).then(function(rows) {
        if(rows[0] != null){
          if(rows[0].user_id === userid){
            editable = true;
          }else {
            editable = false;
          }
        }else {
          editable = false;
        }
        serverSupport.emitGetpostWithpoid(request,response,editable);
      });
    }).catch(function(err) {
      editable = false;
      serverSupport.emitGetpostWithpoid(request,response,editable);
    });
  }
});

app.get('/user/answer',function(request,response) {
  // TODO
});


http.listen(port,function(err){
  if(err){
    console.log(err);
  }else {
    console.log('server is now listening on %d', port);
  }
});
