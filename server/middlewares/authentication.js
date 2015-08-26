var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();

module.exports = {
  authentication : function(request,response,next) {
    var email = request.body.email;
    var password = request.body.password;
    database.user.findUserByEmail(email).then(function(rows) {
      if(rows[0] != null){
        hasher.comparePassword(password,rows[0]).then(function(result) {
          request.userid = rows[0].id;
          return next();
        }).catch(function(err) {
          response.status(401).send({'reason' : 'incorrect username or password',
                                'token' : null});
        });
      }else {
        response.status(401).send({'reason' : 'incorrect username or password',
                              'token' : null});
      }
    }).catch(function(err) {
      response.status(503).send({'reason' : err});
    });
  }
}
