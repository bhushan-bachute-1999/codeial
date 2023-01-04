const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/validate', require('./user'));

module.exports = router;