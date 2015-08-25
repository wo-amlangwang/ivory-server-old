var database = require('./databaseAPI_Post.js');
database.upDatePost({'id' : '102','title' : 'sb','content' : 'cjh'}).then(function(argument) {
  console.log(argument);
}).catch(function(err) {
  console.log(err);
});
