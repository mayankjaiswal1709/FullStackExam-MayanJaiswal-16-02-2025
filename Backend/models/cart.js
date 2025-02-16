const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  items: [CartItemSchema],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

module.exports = Cart;
