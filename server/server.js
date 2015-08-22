var database = require('../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../modules/passwordhasher/passwordhasher.js')();
var token = require('../modules/tokenmaker/tokenmaker.js')();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Promise = require('promise');
var Q = require('q');
var http = require('http').Server(app);

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
      //TODO
    }).catch(function(err) {
      response.status(401).send({'reason' : err});
    });
  }
});

app.get('/user/post',function(request,response) {
});
app.get('/user/post/:poid',function(request,response) {
});
/**
app.post('/user',function(req,res){
  var thistoken = req.token;
  console.log(thistoken);
  if(thistoken === undefined || thistoken === null){
    res.status(403).send({'reason' : 'need token'});
  }else {
    token.verToken(thistoken).then(function(decoded){
      var userid = decoded.id;
      database.findProfileIdByUserId(userid).then(function(result){
        //console.log(result);
        if(result[0] != null){
          //console.log('1');
          database.findProfileById(result[0].profile_id).then(function(result){
            res.status(200).send(result[0]);
          });

        }else {
          database.insertNewProfile().then(function(result){
            var pid = result.insertId;
            database.connectProfileWithUser(userid,pid).then(function(result){
              res.status(200).send({'first_name' : null,'last_name' : null});
            });
          });
        }
      }).catch(function(err){
        console.log(err);
      });
    }).catch(function(err){
      res.status(401).send({'reason' : 'bad token'});
    });
  }
});
app.post('/user/post',function(req,res){
    var thistoken = req.token;
    var content = req.body.content;
    var title = req.body.title;
    if(thistoken === null || thistoken === undefined){
      res.status(403).send({'reason' : 'need token'});
    }else {
      token.verToken(thistoken).then(function(decoded){
        var userid = decoded.id;
        var data = {'title' : title, 'content' : content};
        database.postNewPost(data).then(function(result){
          database.connectPostWithUser(userid,result.insertId).then(function(){
            res.status(200).send({'reason' : 'posted!'});
          }).catch(function(err){
            console.log(err);
          });
        }).catch(function(err){
          console.log(err);
        });
      }).catch(function(err){
        res.status(401).send({'reason' : 'bad token'});
      });
    }
});**/

http.listen(port,function(err){
  if(err){
    console.log(err);
  }else {
    console.log('server is now listening on %d', port);
  }
});
