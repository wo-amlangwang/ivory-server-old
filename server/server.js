var database = require('../models/databaseAPI/databaseAPI.js')();
var hasher = require('../models/passwordhasher/passwordhasher.js')();
var token = require('../models/tokenmaker/tokenmaker.js')();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.send('welcome,ivory-server,test api in /signin');
});
/**
  signin block
**/
app.get('/signin',function(req,res){
  res.sendfile('./server/signin.html');
});
app.post('/signin',function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  database.findUserByEmail(email).then(function(rows){
    if(rows[0] != null){
      res.status(401).send({'reason' : 'email been used'});
    }else{
      hasher.makeHash(password).then(function(result){
        console.log(result);
        var user_info = {'email' : email,
                         'hashed_pw' : result.hashed_pw,
                         'pwsalt' : result.pwsalt};
        database.insertNewUser(user_info).then(function(result){
          token.makeToken({'id' : result.insertId}).then(function(thistoken){
            res.status(200).send({'reason' : 'ok',
                                  'token' : thistoken.token});
          });
        });
      }).catch(function(err){
        console.log(err);
      });
    }
  }).catch(function(err){
    console.log(err);
  });
});
app.get('/authentication',function(req,res){
    res.sendfile('./server/login.html');
});
app.post('/authentication',function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  database.findUserByEmail(email).then(function(rows){
    hasher.comparePassword(password,rows[0]).then(function(result){
      token.makeToken({'id' : rows[0].id}).then(function(thistoken){
        res.status(200).send({'reason' : 'ok',
                              'token' : thistoken.token});
      }).catch(function(err){
        console.log(err);
      });
    }).catch(function(result){
      console.log(result);
      res.status(401).send({'reason' : 'incorrect username or password',
                            'token' : null});
    });
  }).catch(function(err){
    res.status(401).send({'reason' : 'incorrect username or password',
                          'token' : null});
  });
});

app.get('/user',function(req,res){
  var thistoken = req.token;
  if(thistoken === undefined || thistoken === null){
    res.status(403).send({'reason' : 'need token'});
  }else {
    token.verToken(thistoken).then(function(decoded){
      var userid = decoded.id;
      database.findProfileIdByUserId(userid).then(function(result){
        if(result[0] === null){
          database.insertNewProfile().then(function(result){
            var pid = result.insertId;
            database.connectProfileWithUser(userid,pid).then(function(result){
              res.status(200).send({'first_name' : null,'last_name' : null});
            });
          });
        }else {
          database.findProfileById(result[0].profile_id).then(function(result){
            res.status(200).send(result[0]);
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



http.listen(port,function(err){
  if(err){
    console.log(err);
  }else {
    console.log('server is now listening on %d', port);
  }
});
