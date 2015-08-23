var serverSupport = require('./server_support.js');
serverSupport.getAllpostWithUserid(2402).then(function(argument) {
  console.log(argument);
});
