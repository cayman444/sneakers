const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    productInCart: { type: [Object] },
  },
  { versionKey: false }
);

const User = model('User', userSchema);

module.exports = User;
