const express = require('express');
const router = express.Router();
const createUserController = require('../controllers/create_user_controller');

router.post('/', createUserController.createUser);

module.exports = router;