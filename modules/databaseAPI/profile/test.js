var database = require('./databaseAPI_Profile.js');
database.upDateProfile({'id' : 272,'first_name':'cai','last_name':'jiahui'}).then(function(argument) {
  console.log(argument);
}).catch(function(argument) {
  console.log(argument);
});
