var database = require('./databaseAPI.js')();

database.postNewPost({'title':'what computer science is','content' : 'what is cs?'}).then(function(result){
  console.log(result);
}).catch(function(err){
  console.log(err);
});
/**
for(var i = 0; i < 10 ; i++){
  database.connectPostWithUser(2,i).catch(function(err){
    console.log(err);
  });
}
**/
database.findPostIdByUserId(2).then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.log(err);
});

database.findUserIdByPostId(2).then(function(res){
  console.log(res);
}).catch(function (err) {
  console.log(err);
});

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
