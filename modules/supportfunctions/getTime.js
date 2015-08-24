var moment = require('moment');
module.exports = {
    getCurrentTime : function(){
      return moment().format('LLLL');
    }
}
