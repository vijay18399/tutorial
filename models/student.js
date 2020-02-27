var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  roll_number:String,
  name: String,
  gpa: Number,
  isDetained: { type: Boolean, default: false },
  joinedAt: Date,
  assets :Array
});
module.exports = mongoose.model('Student', StudentSchema);