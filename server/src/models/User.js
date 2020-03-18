const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  admin: { type: Boolean, default: false }
});

let User = mongoose.model("User", userSchema, "users");
module.exports = User;
