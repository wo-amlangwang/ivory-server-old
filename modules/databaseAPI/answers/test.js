var database = require('./databaseAPI_answer.js');
var data = {'content' : '1234567'};

var pssss = database.insertNewAnswer(data).then(function(result) {
  console.log(result.insertId);
}).catch(function(err) {
  console.log(err);
});
