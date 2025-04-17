const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  interests: [{ type: String }],
  age: { type: Number, required: true },
  mobile: { type: Number, required: true, uniqui:true },
  email: { type: String, required: true,uniqui:true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;