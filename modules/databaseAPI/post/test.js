var database = require('./databaseAPI_Post.js');
database.findPostById(102).then(function(argument) {
  console.log(argument);
});
