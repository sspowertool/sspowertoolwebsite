const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemCode: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String },
  pieces: { type: Number },
  photo: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
