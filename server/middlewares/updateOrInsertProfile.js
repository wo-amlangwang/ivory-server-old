var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();

module.exports = {
  updateOrInsertProfile : function(request,response,next) {
    database.userProfileLinks.findProfileIdByUserId(request.userid).then(function(rows){
      if(rows[0] != null){
        var data = {'id' : rows[0].profile_id,
                    'last_name' : request.body.last_name,
                    'first_name' : request.body.first_name};
        database.profile.upDateProfile(data).then(function() {
          response.status(200).send({'reason' : 'ok'});
        }).catch(function(err) {
          response.status(503).send({'reason' : err});
        });
      }else {
        database.profile.insertNewProfile().then(function(result) {
          var pid = result.insertId;
          database.userProfileLinks.connectProfileWithUser(request.userid,pid).then(function(argument) {
            var data = {'id' : pid,
                        'last_name' : request.body.last_name,
                        'first_name' : request.body.first_name};
            database.profile.upDateProfile(data).then(function() {
              response.status(200).send({'reason' : 'ok'});
            }).catch(function(err) {
              response.status(503).send({'reason' : err});
            });
          }).catch(function(err) {
            response.status(503).send({'reason' : err});
          });
        }).catch(function(err) {
          response.status(503).send({'reason' : err});
        });
      }
    }).catch(function(err) {
      response.status(503).send({'reason' : err});
    });
  }
}
