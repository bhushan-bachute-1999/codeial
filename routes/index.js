const { application } = require('express');
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const contactController = require('../controllers/contact_controller');

console.log("Router loaded");
router.get('/', homeController.home);//When "/" go to home controller
router.use('/user', require('./users'));// When "/user" go to user controller
router.get('/contact', contactController.contact);
router.use('/post', require('./post'));

module.exports = router;