var token = require('./tokenmaker.js')();

token.makeToken({'user' : 'lin434@purdue.edu','password' : '54321'}).then(function(result){
  console.log(result);
  token.verToken(result.token).then(function(result){
    console.log(result);
  }).catch(function(err){
    console.log('this is a err');
    console.log(err);
  });
});
