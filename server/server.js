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
var middlewares = require('./middlewares/middlewares.js');
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

//Siyuan : Should use this instead, do not write route login in one file.
/*
https://www.npmjs.com/package/asset-server
   app.get('/signin', helper.authenticate, helper.checksomething, route.authenticate)
*/
app.get('/signin',function(request,response) {
  response.sendFile(__dirname + '/htmls/signin.html');
});
app.post('/signin',middlewares.checkEmail,
middlewares.insertNewUserIntoDb,middlewares.makeToken);

app.get('/authentication',function(request,response) {
  response.sendFile(__dirname + '/htmls/login.html');
});
app.post('/authentication',middlewares.authentication,middlewares.makeToken);

app.get('/user',middlewares.checkToken,middlewares.findOrInsertProfile);
app.post('/user',middlewares.checkToken,middlewares.updateOrInsertProfile);

app.post('/user/post',middlewares.checkToken,middlewares.postNewPost);
app.get('/user/post',middlewares.checkToken,middlewares.getAllPost);

app.get('/token',middlewares.checkToken,function(request,response) {
  response.status(200).send({'reason' : 'ok'});
});

app.get('/post',);
app.get('/post/:poid',);
app.get('/post/:poid/answers',);
app.get('/somefunction',);
http.listen(port,function(err){
  if(err){
    console.log(err);
  }else {
    console.log('server is now listening on %d', port);
  }
});
