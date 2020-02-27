var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HallticketSchema = new Schema({
  roll_number: String,
  subjects: Object,
  name : String
});
module.exports = mongoose.model('Hallticket', HallticketSchema);