passhash = require('./passwordhasher.js')();

passhash.makeHash('12345678').then(function(result){
  console.log(result);
  passhash.comparePassword('1245678',result).then(function(result){
    console.log(result);
  }).catch(function(err){
    console.log(err);
  });
}).catch(function(err){
  console.log(err);
});
