const Product = require('../models/Product');
const slufigy = require('slugify');
const { default: slugify } = require('slugify');
const User = require('../models/user');
const mongoose = require('mongoose');
const { json } = require('body-parser');

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const NewProduct = await new Product(req.body).save();
    res.json(NewProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  try {
    let products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']])
      .exec();
    res.json(products);
  } catch (err) {
    res.json({
      err: err,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({ slug: req.params.slug });
    res.json(deleted);
  } catch (e) {
    res.json({
      err: err,
    });
  }
};

// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    let currentPage = page || 1;
    let perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.ProductsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.getProduct = async (req, res) => {
  try {
    const response = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .populate('subs')
      .exec();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.slug).exec();
  const user = await User.findOne({ email: req.user.email }).exec();

  const { star } = req.body;
  // Checking if the user already give the ratings

  let StarRatingObject = product.ratings.find((ele) => {
    return ele.PostedBy.toString() === user._id.toString();
  });

  if (StarRatingObject === undefined) {
    const NewRatingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, PostedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log('rating added');
    res.json(NewRatingAdded);
  } else {
    const UpdateRatings = await Product.updateOne(
      {
        ratings: { $elemMatch: StarRatingObject },
      },
      { $set: { 'ratings.$.star': star } },
      { new: true }
    ).exec();
    console.log('Rating updated');
    res.json(UpdateRatings);
  }
};

exports.RelatedProducts = async (req, res) => {
  const product = await Product.findById(req.params.slug).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .populate('category')
    .populate('subs')
    .limit(3)
    .exec();
  res.json(related);
};

/*Category Products*/

exports.CategoryProducts = async (req, res) => {
  const result = await Product.find({
    category: req.params.slug,
  }).exec();
  res.json(result);
};

// Search Filterrs

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } }).exec();
  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let product = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    }).exec();
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

const handleCategory = async (req, res, category) => {
  console.log(category);
  try {
    const products = await Product.find({ category }).exec();
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

const handleSubCategories = async (req, res, sub) => {
  try {
    const product = await Product.find({
      subs: sub,
    }).exec();
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

const handleBrand = async (req, res, brand) => {
  let product = await Product.find({ brand }).exec();
  res.json(product);
};

const handleColor = async (req, res, color) => {
  try {
    let product = await Product.find({ color }).exec();
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

const handleShipping = async (req, res, shipping) => {
  try {
    const product = await Product.find({ shipping }).exec();
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

exports.SearchFilters = async (req, res) => {
  const { query, price, category, sub, brand, color, shipping } = req.body;
  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }
  if (category) {
    await handleCategory(req, res, category);
  }
  if (sub) {
    await handleSubCategories(req, res, sub);
  }
  if (brand) {
    await handleBrand(req, res, brand);
  }
  if (color) {
    await handleColor(req, res, color);
  }
  if (shipping) {
    await handleShipping(req, res, shipping);
  }
};
