const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  businessName: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
  businessAddress: String,
  transportName: String,
  transportMarca: String,
  gst: String,
  visitingCard: String, // or a path to the uploaded file
});

const User = mongoose.model('User', userSchema);

module.exports = User;
