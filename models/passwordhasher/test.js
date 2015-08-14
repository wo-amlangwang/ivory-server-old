passhash = require('./passwordhasher.js')();

passhash.makeHash('qq1234').then(function(result){
  console.log(result);
  passhash.comparePassword('qq1234',result).then(function(result){
    console.log(result);
  }).catch(function(err){
    console.log(err);
  });
}).catch(function(err){
  console.log(err);
});
