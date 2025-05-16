const { Schema, model } = require('mongoose');
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  resetToken: String,
  resetTokenExpiry: Date
});
module.exports = model('User', userSchema);
