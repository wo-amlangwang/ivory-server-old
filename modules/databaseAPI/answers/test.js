var database = require('./databaseAPI_answer.js');
var data = {'id': 2 ,'content' : '1244434567'};

var pssss = database.updateAnswers(data).then(function(result) {
  console.log(result);
}).catch(function(err) {
  console.log(err);
});
