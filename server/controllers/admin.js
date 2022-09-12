const Orders = require('../models/order');

exports.orders = async (req, res) => {
  const Allorders = await Orders.find({}).populate('products.product').exec();
  res.json(Allorders);
};
exports.orderStatus = async (req, res) => {
  const { orderID, orderStatus } = req.body;
  const Status = await Orders.findByIdAndUpdate(
    orderID,
    { orderStatus },
    { new: true }
  ).exec();
  res.json(Status);
};
