const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      count: Number,
      color: String,
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: 'Not Processed',
    enum: [
      'Not Processed',
      'Processing',
      'Dispatched',
      'Cancelled',
      'Completed',
    ],
  },
  orderdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Order', orderSchema);
