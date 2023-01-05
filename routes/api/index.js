const express = require('express');
const router = express.Router();

router.use('/v1', require('./v1'));//If request for version 1 then got to v1 folder
router.use('/v2', require('./v2'));//If request for version 2 then got to v2 folder

module.exports = router;