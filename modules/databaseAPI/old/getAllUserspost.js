var Q = require('q');
var database = require('./databaseAPI.js')();
module.exports = function(){
  return{
    getAllUserPost : function(id){
      database.findPostIdByUserId(id).then(function(result) {
        //console.log(result);
        var numOfPost = result.length;
        //console.log(numOfPost);
        var promises = [];
        var post = [];
        for(var i = 0; i < numOfPost; i++){
          //console.log(result[i].post_id);
          promises[i] = database.findPostById(result[i].post_id).then(function(rows){
            //console.log(rows);
            post.push(rows[0]);
          });
        }
        Q.all(promises).done(function(){
          console.log(post);
        });
      });
    }
  }
}
/**
app.get('/user/post',function(req,res){
  var thistoken = req.token;
  if(thistoken === null || thistoken = undefined){
    res.status(403).send({'reason' : 'need token'});
  }else{
    token.verToken(thistoken).then(function(decoded){
      database.findPostIdByUserId(decoded.id).then(function(result){
        var numOfPost = result.length;
        var promises[numOfPost];
        var post[numOfPost];
        for(var i = 0; i < numOfPost; i++){
          promises[i] = database.findPostById(result[i]).then(function(rows){
            post[i] = rows[0];
          });
        }
        Q.all(promises).done(function(){
          res.status(200).send({'reason' : 'ok',
                                'posts' : post});
        });
      }).catch(function(err){
        console.log(err);
      });
    }).catch(function(err){
      res.status(401).send({'reason' : 'bad token'});
    });
  }
});**/
