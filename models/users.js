var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

