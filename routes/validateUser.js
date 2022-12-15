const express = require('express');
const router = express.Router();
console.log("Validate user router");
const passport = require('passport');
const validateController = require('../controllers/validateUser');

// router.get('/', validateController.validate);
router.get('/', passport.authenticate(
    'local',
    { failureRedirect: '/log_in' }
), validateController.validate);

module.exports = router;