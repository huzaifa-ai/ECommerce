const Product = require('../models/Product');
const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.userCart = async (req, res) => {
  const cart = req.body.cart;
  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  let AlreadyExistUserCart = await Cart.findOne({ orderdBy: user._id }).exec();

  if (AlreadyExistUserCart) {
    AlreadyExistUserCart.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let obj = {};
    obj.product = cart[i]._id;
    obj.color = cart[i].color;
    obj.count = cart[i].count;

    let ProductFromDB = await Product.findById(cart[i]._id)
      .select('price')
      .exec();
    obj.price = ProductFromDB.price;
    products.push(obj);
  }

  let CartTotal = 0;

  for (i = 0; i < products.length; i++) {
    CartTotal = CartTotal + products[i].price * products[i].count;
  }
  console.log('CART Total', CartTotal);

  let newCart = await new Cart({
    products: products,
    CartTotal: CartTotal,
    orderdBy: user._id,
  }).save();

  console.log('--cart', newCart);

  res.json({ ok: true });
};

exports.GetUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const UserCart = await Cart.findOne({ orderdBy: user })
    .populate('products.product')
    .exec();
  res.json(UserCart);
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const DeleteCart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(DeleteCart);
};

exports.SaveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({ ok: true });
};

exports.userOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  res.json({ ok: true });

  // Decrement quantity, decrement sold
};

exports.userOrders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();
  let orders = await Order.find({ orderdBy: user._id })
    .populate('products.product')
    .exec();

  res.json(orders);
};
