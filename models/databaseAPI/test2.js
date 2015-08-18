singleton = require('./singleTonexample.js');
module.exports = {
  printsomething : function(){
    console.log(singleton.connection);
  }
}
