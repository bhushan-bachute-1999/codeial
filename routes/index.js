const { application } = require('express');
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const contactController = require('../controllers/contact_controller');

console.log("Router loaded");
router.get('/', homeController.home);
router.use('/user', require('./users'));
router.get('/contact', contactController.contact);
router.use('/post', require('./post'));

module.exports = router;