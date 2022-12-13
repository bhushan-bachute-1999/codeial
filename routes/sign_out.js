const express = require('express');
const router = express.Router();
const signOutController = require('../controllers/sign_out_controller');

router.get('/', signOutController.sign_out);

module.exports = router;