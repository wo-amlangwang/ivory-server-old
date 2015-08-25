var jwt = require('jsonwebtoken');
var key = require('./configs/token.json');
module.exports = function(){
  return{
    makeToken : function(userinfo){
      var ps = new Promise(function(fullfill, reject) {
        var token = jwt.sign(userinfo,key.key,{expiresInMinutes : 1440},{ algorithm: 'RS256'});
        fullfill({'token' : token});
      });
      return ps;
    },
    verToken : function(token){
      var ps = new Promise(function(fullfill,reject){
        var decoded = jwt.verify(token, key.key,function (err,decoded) {
          if(err)
            reject(err);
          else {
            fullfill(decoded);
          }
        });


      });
      return ps;
    }
  }
}
