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
app.post('/test',middlewares.test1);
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
app.post('/user/post/:poid',function(request,response) {
  var thistoken = request.body.token || request.query.token
              || request.headers['x-access-token'];
  if(thistoken === null || thistoken === undefined){
    response.status(401).send({'reason' : 'need token'});
  }else {
    token.verToken(thistoken).then(function(decoded) {
      var user_id = decoded.id;
      database.poster.upDatePost();//TODO
    }).catch(function(err) {
      response.status(401).send({'reason' : err});
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
