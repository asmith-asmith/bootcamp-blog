var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
  title: String,
  list: []
}, {
  timestamps: true
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  lists: [listSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);