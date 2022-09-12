const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      text: true,
      maxlength: 32,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    images: {
      type: Array,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    subs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sub',
      },
    ],
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
    },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'Micrsoft', 'Lenovo', 'ASUS'],
    },
    ratings: [
      {
        star: Number,
        PostedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Product', ProductSchema);
