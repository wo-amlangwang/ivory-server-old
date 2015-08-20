var token = require('./tokenmaker.js')();

token.makeToken({'id' : 3244523}).then(function(result){
  console.log(result);
  token.verToken(result.token).then(function(result){
    console.log(result);
  }).catch(function(err){
    console.log('this is a err');
    console.log(err);
  });
});
