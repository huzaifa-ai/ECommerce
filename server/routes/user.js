const express = require('express');

const router = express.Router();
const { authCheck } = require('../middlewares/auth');
const {
  userCart,
  GetUserCart,
  emptyCart,
  SaveAddress,
  userOrder,
  userOrders,
} = require('../controllers/user');

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, GetUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, SaveAddress);
router.post('/user/order', authCheck, userOrder);
router.get('/user/orders', authCheck, userOrders);

module.exports = router;
