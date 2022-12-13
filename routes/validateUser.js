const express = require('express');
const router = express.Router();
const validateController = require('../controllers/validateUser');

router.get('/', validateController.validate);

module.exports = router;