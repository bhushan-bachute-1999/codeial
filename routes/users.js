const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/user_controller');

// router.get('/profile', userController.profile);//No authentication to go to profile page
router.get('/profile', passport.checkAuthentication, userController.profile);//Go to profile page only when user is authenticated
router.get('/editProfile', userController.editProfile);

module.exports = router;