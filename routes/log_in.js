const express = require('express');
const router = express.Router();
const logInController = require('../controllers/log_in');

router.get('/', logInController.logIn);
router.use('/validate_user', require('./validateUser'));

module.exports = router;