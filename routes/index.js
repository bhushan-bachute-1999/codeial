const { application, Router } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');
const contactController = require('../controllers/contact_controller');
const signOutController = require('../controllers/sign_out_controller');

console.log("Router loaded");
router.get('/', homeController.home);//When "/" go to home controller
router.use('/user', require('./users'));// When "/user" go to user controller
router.get('/contact', contactController.contact);
router.use('/post', require('./post'));
router.use('/sign_up', require('./sign_up'));
router.use('/log_in', require('./log_in'));
router.get('/sign_out', signOutController.sign_out);
router.use('/delete', require('./delete'));

module.exports = router;