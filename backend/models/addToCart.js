const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true },
);

const Cart = mongoose.model('AddToCart', cartSchema);
module.exports = Cart;
