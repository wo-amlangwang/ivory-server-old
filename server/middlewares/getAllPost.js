var database = require('../../modules/databaseAPI/databaseAPI_main.js');
var hasher = require('../../modules/passwordhasher/passwordhasher.js')();
var token = require('../../modules/tokenmaker/tokenmaker.js')();
var serverSupport = require('../server_support.js');

module.exports = {
  getAllPost : function(request,response,next) {
    var userid = request.userid;
    serverSupport.getAllpostWithUserid(userid).then(function(posts) {
      response.status(200).send({'reason' : 'ok',
                                 'posts' : posts});
    }).catch(function(err) {
      response.status(503).send({'reason' : err});
    });
  }
}
