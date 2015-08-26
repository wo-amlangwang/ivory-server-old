var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();

module.exports = {
  checkEmail : function(request,response,next){
    var email = request.body.email;
    database.user.findUserByEmail(email).then(function(rows) {
      if(rows[0] != null){
        response.status(409).send({'reason' : 'user excist'});
      }else {
        return next();
      }
    }).catch(function(err) {
      response.status(503).send({'reason' : err});
    });
  }
}
