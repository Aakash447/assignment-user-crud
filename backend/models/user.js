const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user: { type: String, required: true },
  interest: [{ type: String }],
  age: { type: Number, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;