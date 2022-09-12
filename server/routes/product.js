const express = require('express');

const router = express.Router();

//middleware

const { authCheck, adminCheck } = require('../middlewares/auth');

//controller
const {
  create,
  listAll,
  remove,
  list,
  ProductsCount,
  getProduct,
  productStar,
  RelatedProducts,
  CategoryProducts,
  SearchFilters,
} = require('../controllers/product');

// routes

router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', ProductsCount);
router.get('/products/:count', listAll); // product/100
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.post('/products', list);
router.get('/product/:slug', getProduct);
router.post('/products/star/:slug', authCheck, productStar);
router.get('/products/related/:slug', RelatedProducts);
router.get('/category/products/:slug', CategoryProducts);

// Search Queries
router.post('/search/filters', SearchFilters);

module.exports = router;
