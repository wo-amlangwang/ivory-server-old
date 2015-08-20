var database = require('./databaseAPI_main.js');

/*
poster : require('./databaseAPI_Post.js'),
posterUserLinks : require('./databaseAPI_User&Post.js'),
user : require('./databaseAPI_User.js'),
profile : require('./databaseAPI_Profile.js'),
userProfileLinks : require('./databaseAPI_User&Profile.js')
*/
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});

database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
database.userProfileLinks.findPostIdByUserId(789).done(function (argument) {
  console.log(argument);
});
/**
database.userProfileLinks.connectProfileWithUser(789,564);
database.userProfileLinks.connectProfileWithUser(789,231);
database.userProfileLinks.connectProfileWithUser(789,456);

/*
database.user.insertNewUser({'email' : 'l1@qq.com','hashed_pw' : '1234',
                             'pwsalt' : '321'}).done(function(message){
                               console.log(message);

                                database.user.findUserByEmail('l1@qq.com').done(function(message){
                                  console.log(message);
                                  database.user.findUserById(2212).done(function(anothermessage){
                                    console.log(anothermessage);
                                  });
                                });
});
database.profile.insertNewProfile().done(function(message){
  console.log(message);
  var id = message.insertId;
  database.profile.findProfileById(message.insertId).done(function(info){
    console.log(info);
    database.profile.upDateProfile({'id' : id, 'first_name' : 'langwang','last_name' : '123'})
    .done(function (argument) {
      database.profile.findProfileById(id).done(function (argument) {
        console.log(argument);
      });
    });
  });
});
*/
