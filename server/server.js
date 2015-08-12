var database = require('../models/databaseAPI/databaseAPI.js')();
var hasher = require('../models/passwordhasher/passwordhasher.js')();
var token = require('../models/tokenmaker/tokenmaker.js')();
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.send('welcome,ivory-server,test api in /signin');
});

app.get('/signin',function(req,res){
  res.sendFile('./server/signin.html');
});

app.post('/signin',function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  database.findUserByEmail(email).then(function(rows){
    if(rows[0] != null){
      res.status(201).send({'reason' : 'email been used'});
    }else{
      hasher.makeHash(password).then(function(result){
        console.log(result);
        var user_info = {'email' : email,
                         'hashed_pw' : result.hashed_pw,
                         'pwsalt' : result.pwsalt};
        database.insertNewUser(user_info).then(function(result){
          token.makeToken({'id' : result.insertId}).then(function(token){
            res.status(200).send({'reason' : 'ok',
                                  'token' : token.token});
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




http.listen(port,function(err){
  if(err){
    console.log(err);
  }else {
    console.log('server is now listening on %d', port);
  }
});
