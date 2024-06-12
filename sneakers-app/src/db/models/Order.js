const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  userName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
});

const Order = model('Order', orderSchema);

module.exports = Order;
