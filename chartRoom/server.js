var app = require('express')();
var mongoose = require('mongoose');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
mongoose.connect();

app.use(bodyParser());
app.post('/ivory/chartroom/login',function(req,res) {
  var client;
  if(req.body.email === undefined || req.body.email === 'null'){
    //for guest
    var guestid = '/guest/' + uuid.v1();
    client = io.of(guestid);
    res.send({'message' : 'hello',
              'ID' : guestid});
  } else {
    //for registered user
    //TODO
    var registeredUser = '/user/';
    res.send({'message' : 'welcome return user',
              'ID' : registeredUser});
  }
  require('./connect.js')(io, client, mongoose, app);
});

server.listen(port,function (err) {
  if(err){
    console.log(err);
    process.exit(0);
  }
  console.log('server is now listening on ' + port);
});
