var database = require('../models/databaseAPI/databaseAPI.js');
var hasher = require('../models/passwordhasher/passwordhasher.js');
var token = require('../models/tokenmaker/tokenmaker.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);

var port = process.env.PORT || 5000;

app.get('/',function(req,res){
  res.send('welcome,ivory-server');
});








http.listen(port,function(err){
  if(err){
    console.log(err);
  }else {
    console.log('server is now listening on %d', port);
  }
});
