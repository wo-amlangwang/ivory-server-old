var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();

module.exports = {
  makeToken : function(request,response) {
    token.makeToken({'id' : request.insertId}).then(function(thistoken){
      response.status(200).send({'reason' : 'ok',
                                 'token' : thistoken.token});
    }).catch(function(err){
      response.status(503).send({'reason' : err});
    });
  }
}
