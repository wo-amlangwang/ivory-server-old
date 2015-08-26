var express = require('express');
var app = express();
var http = require('http').Server(app);


var print1 = function(request,response,next) {
  console.log(request.params.id + 1);
  return next();
}
var print2 = function(request,response,next) {
  console.log(request.params.id + 2);
  return next();
}
var print3 = function(request,response,next) {
  response.send(request.params.id + 3);
  return next();
}

app.get('/bi/:id',print1,print2,print3);
http.listen(5000);
