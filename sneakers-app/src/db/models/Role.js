const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const roleSchema = new Schema({
  value: { type: String, unique: true, default: 'User' },
});

const Role = model('Role', roleSchema);

module.exports = Role;
