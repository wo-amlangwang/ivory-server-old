var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();

module.exports = {
  insertNewUserIntoDb : function(request,response,next) {
    hasher.makeHash(request.body.password).then(function(result) {
      var user_info = {'email' : request.body.email,
                       'hashed_pw' : result.hashed_pw,
                       'pwsalt' : result.pwsalt};
      database.user.insertNewUser(user_info).then(function(result){
        token.makeToken({'id' : result.insertId}).then(function(thistoken){
          response.status(200).send({'reason' : 'ok',
                                     'token' : thistoken.token});
        }).catch(function(err){
          response.status(503).send({'reason' : err});
        });
      });
    }).catch(function(err){
      response.status(503).send({'reason' : err});
    });
  }
}
