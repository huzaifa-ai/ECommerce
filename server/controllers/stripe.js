const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/Product');

const stripe = require('stripe')(
  'sk_test_51LcqBoLoq06UcIXYGpcUq2RFXIAJH31Gb8IxnBzhKsj2Gc7TwBJHUZYYWdXIZRyUAc9SaDCO8NPQNXc9XhthSMpd00Ra3JcELD'
);

exports.createpaymentIntent = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const { CartTotal } = await Cart.findOne({ orderdBy: user._id }).exec();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: CartTotal * 100,
    currency: 'usd',
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    CartTotal: CartTotal,
  });
};
