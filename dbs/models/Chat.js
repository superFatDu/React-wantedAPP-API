const mongoose = require("mongoose");

let chatSchema = new mongoose.Schema({
  "chat_id": {type: String, require: true},
  "from": {type: String, require: true},
  "to": {type: String, require: true},
  "content": {type: String, require: true},
  "create_time": {type: Number, default: new Date().getTime()},
  "read": {type: Boolean, default: false}
});

module.exports = mongoose.model("Chat", chatSchema);