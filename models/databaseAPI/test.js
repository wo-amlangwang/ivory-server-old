var database = require('./databaseAPI.js')();

database.postNewPost({'content' : 'what is cs?'});

/**
database.upDateProfile({'id' : '32', 'first_name' : 'fangzhou', 'last_name' : 'lin'}).then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});

/**
database.findUserByEmail('langwang@gmail.com').then(function(rows){
  console.log(rows[0].id);
}).catch(function(err){
  console.log(err);
});

/**
database.findProfileIdByUserId(1632).then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});
**/
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
