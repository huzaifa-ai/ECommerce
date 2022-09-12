const express = require('express');

const router = express.Router();

//middleware

const { authCheck, adminCheck } = require('../middlewares/auth');

//controller
const { read, update, remove, list } = require('../controllers/subs');
const { create } = require('../controllers/subs');

// routes
router.get('/sub/:slug', read);
router.get('/subs', list);

router.post('/sub', authCheck, adminCheck, create);

router.put('/sub/:slug', authCheck, adminCheck, update);
router.delete('/sub/:slug', authCheck, adminCheck, remove);

module.exports = router;
