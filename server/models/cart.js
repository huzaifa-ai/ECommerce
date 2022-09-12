const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        color: String,
        count: Number,
        price: Number,
      },
    ],
    CartTotal: Number,
    orderdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Cart', CartSchema);
