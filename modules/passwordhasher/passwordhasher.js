var Promise = require('promise');
var crypto = require('crypto');

module.exports=function(){
  var generateSalt = function(){
    var salt = crypto.randomBytes(256).toString('hex');
    return salt;
  }
  return{
    makeHash : function(password){
      var ps = new Promise(function(fulfill,reject){
        var salt = generateSalt();
        crypto.pbkdf2(password,salt,1000,256,'sha256',function(err,key){
          if(err){
            reject(err);
          }else{
            var hashedpw = key.toString('hex');
            var revalue = {'hashed_pw' : hashedpw,
                           'pwsalt' : salt};
          //  console.log(revalue);
            fulfill(revalue);
          }
        });
      });
      return ps;
    },
    comparePassword : function(password,passwordInBase){
      var ps = new Promise(function(fulfill,reject){
        //console.log(passwordInBase);
        var salt = passwordInBase.pwsalt;
        crypto.pbkdf2(password,salt,1000,256,'sha256',function(err,key){
          if(err){
            reject(err);
          }else{
            if(key.toString('hex') === passwordInBase.hashed_pw){
              fulfill({'result' : 'correct'});
            }else{
              reject({'result' : 'incorrect'});
            }
          }
        });
      });
      return ps;
    }
  }
}
