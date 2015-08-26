var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();

module.exports = {
  checkToken : function(request,response,next) {
    var thistoken = request.body.token || request.query.token
                || request.headers['x-access-token'];
    if(thistoken === undefined || thistoken === null){
      response.status(401).send({'reason' : 'need token'});
    }else{
      token.verToken(thistoken).then(function(decoded){
        request.userid = decoded.id;
        return next();
      }).catch(function(err){
        response.status(401).send({'reason' : err});
      });
    }
  }
}
