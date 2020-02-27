var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
  to: String,
  from: String,
  message: String
});
module.exports = mongoose.model('Message', MessageSchema);