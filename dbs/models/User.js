const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  "user": { type: String, require: true },
  "pwd": { type: String, require: true },
  "type": { type: String, require: true },
  "avatar": {type: String},
  "desc": {type: String},
  "title": String,
  "company": String,
  "money": String,
  "selectIcon": String
});

module.exports = mongoose.model("User", userSchema);