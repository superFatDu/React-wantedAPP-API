const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);