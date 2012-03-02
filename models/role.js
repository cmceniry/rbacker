var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var roleSchema = new Schema({
  name: String,
  description: String,
  owner: String,
});

module.exports = roleSchema
