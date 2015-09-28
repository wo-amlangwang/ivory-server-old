var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
  name : String,
  userUuid : String[]
});
module.exports = mongoose.model('Room', roomSchema);
