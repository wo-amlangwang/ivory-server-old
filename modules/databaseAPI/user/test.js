var database = require('./findUserById.js');
database.findUserById(123).then(function (argument) {
  console.log(argument);
}).catch(function (argument) {
  console.log(argument);
});
