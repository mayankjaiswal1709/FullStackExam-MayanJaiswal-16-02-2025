// models/product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String, 
  },
});


const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
