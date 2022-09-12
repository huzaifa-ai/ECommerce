const express = require('express');

const router = express.Router();

//middleware

const { authCheck, adminCheck } = require('../middlewares/auth');

//controller
const { upload, remove } = require('../controllers/cloudinary');

// routes
router.post('/uploadImages', authCheck, adminCheck, upload);
router.post('/removeImages', authCheck, adminCheck, remove);

module.exports = router;
