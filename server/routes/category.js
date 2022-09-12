const express = require('express');

const router = express.Router();

//middleware

const { authCheck, adminCheck } = require('../middlewares/auth');

//controller
const {
  create,
  read,
  update,
  remove,
  list,
  subcategory,
} = require('../controllers/category');

// routes
router.get('/category/:slug', read);
router.get('/categories', list);
router.post('/category', authCheck, adminCheck, create);
router.put('/UpdateCategory/:slug', authCheck, adminCheck, update);
router.delete('/DeleteCategory/:slug', authCheck, adminCheck, remove);
router.get('/category/sub/:_id', subcategory);

module.exports = router;
