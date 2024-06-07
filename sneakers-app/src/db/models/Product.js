const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    mainImage: { type: String, required: true },
    gallery: { type: [String], required: true },
    sizes: { type: [Object], required: true, _id: false },
    description: { type: String, required: true },
    chars: {
      gender: { type: [String], required: true },
      color: { type: String, required: true },
      country: { type: String, required: true },
      compound: { type: String, required: true },
    },
    rating: { type: Number },
    video: { type: String },
  },
  { versionKey: false }
);

const Product = model('Product', productSchema);

module.exports = Product;
