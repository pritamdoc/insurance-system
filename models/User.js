const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  dob: Date,
  address: String,
  phone: String,
  state: String,
  zip: String,
  email: String,
  gender: String,
  userType: String,
  city: String,
  accountType: String,
});

module.exports = mongoose.model("User", userSchema);
