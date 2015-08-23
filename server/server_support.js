var database = require('../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../modules/passwordhasher/passwordhasher.js')();
var token = require('../modules/tokenmaker/tokenmaker.js')();
var Promise = require('promise');
var Q = require('q');
module.exports = {
  emitGetpostWithpoid : function(request,response,editable) {
    database.poster.findPostById(request.params.poid).then(function(rows) {
      response.status(200).send({'reason':'ok',
                                 'editable' : editable,
                                 'post' : rows[0]});
    }).catch(function(err) {
      response.status(503).send({'reason' : err});
    });
  },
  getAllpostWithUserid : function(user_id){
    var ps = new Promise(function(resolve, reject) {
      database.posterUserLinks.findPostIdByUserId(user_id).then(function(rows) {
        var promises = [];
        var posts = [];
        for(var i = 0; i < rows.length; i++){
          promises[i] = database.poster.findPostById(rows[i].post_id).then(function(results){
            posts.push(results[0]);
          });
        }
        Q.all(promises).done(function() {
          resolve(posts);
        });
      }).catch(function(err){
        reject(err);
      });
    });
    return ps;
  }
}
