var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();

module.exports = {
  findOrInsertProfile : function(request,response,next) {
    database.userProfileLinks.findProfileIdByUserId(request.userid).then(function(rows){
      if(rows[0] != null){
        database.profile.findProfileById(rows[0].profile_id).then(function(rows){
          response.status(200).send(rows[0]);
        });
      }else {
        database.profile.insertNewProfile().then(function(result) {
          var pid = result.insertId;
          database.userProfileLinks.connectProfileWithUser(request.userid,pid)
          .then(function(argument) {
            response.status(200).send({'first_name' : null,'last_name' : null});
          });
        });
      }
    }).catch(function(err){
      response.status(503).send({'reason' : err});
    });
  }
}
