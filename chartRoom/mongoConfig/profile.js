var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
  userid : String,
  name : String,
  major : String[],
  room : String[]
});

module.exports = mongoose.model('Profile', profileSchema);
