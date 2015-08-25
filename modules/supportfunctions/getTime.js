var moment = require('moment');
module.exports = {
    getCurrentTime : function(){
      return moment().format('YYYY:MM:DD:hh:mm:ss');
    }
}
