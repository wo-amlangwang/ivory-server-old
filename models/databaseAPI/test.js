var database = require('./databaseAPI.js')();

database.findProfileIdByUserId(1632).then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});

/**
database.insertNewUser({'email' : 'langwang@gmail.com','hasehed_pw' : '12345','pwsalt':'321'}).then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});
database.insertNewProfile().then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});**/
/**
database.findUserById(1422).then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});

database.findProfileById(102).then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});
database.connectProfileWithUser(1,2).then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});**/
