const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Model Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
