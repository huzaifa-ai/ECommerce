const express = require('express');
const router = express.Router();

const { authCheck } = require('../middlewares/auth');

const { createpaymentIntent } = require('../controllers/stripe');

router.post('/createPaymentIntent', authCheck, createpaymentIntent);

module.exports = router;
