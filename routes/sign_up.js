const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/sign_up_controller');

router.get('/', signUpController.sign_up);
router.use('/user_created', require('./createUser'));

module.exports = router;