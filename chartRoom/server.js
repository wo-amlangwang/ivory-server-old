var app = require('express')();
var mongoose = require('mongoose');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var User = require('./mongoConfig/user.js');

mongoose.connect('mongodb://dalangwang:1234qwer@ds035593.mongolab.com:35593/heroku_qf7gd7t4',function(err) {
  if(err){
    console.log(err);
    process.exit(0);
  }else {
    console.log('connect to database');
  }
});

app.use(bodyParser());
app.post('/ivory/chartroom/register',function(req,res) {
  User.findOne({'email' : req.body.eamil},function(err, user){
    if(err){
      console.log(err);
      res.status(503).send('database err');
    }else {
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      res.status(200).send('OK');
    }
  });
});

app.post('/ivory/chartroom/login',function(req,res) {
  var client;
  if(req.body.isGuest === 'true'){
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
