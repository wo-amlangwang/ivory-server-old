var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();

module.exports = {
  postNewPost : function(request,response,next) {
    database.poster.postNewPost({'title' : request.body.title,
                               'content' : request.body.content})
    .then(function(result) {
      database.posterUserLinks.connectPostWithUser(request.userid,
      result.insertId).then(function(argument) {
        response.status(200).send({'reason' : 'ok'});
      }).catch(function(err) {
        response.status(503).send({'reason' : err});
      });
    })
    .catch(function(err) {
      response.status(503).send({'reason' : err});
    });
  }
}
