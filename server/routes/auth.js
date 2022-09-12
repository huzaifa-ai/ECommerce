const express = require('express');

const router = express.Router();

//middleware

const { authCheck, adminCheck } = require('../middlewares/auth');

//controller
const { createupdateUser, currentUser } = require('../controllers/auth');

router.post('/create-or-update-user', authCheck, createupdateUser);

router.post('/current-user', authCheck, currentUser);
router.post('/admin', authCheck, adminCheck, currentUser);

module.exports = router;
