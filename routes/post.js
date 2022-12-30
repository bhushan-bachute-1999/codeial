const express = require('express');
const router = express.Router();
const passport = require('passport');
const postLikeController = require('../controllers/post_like');

router.get('/like', postLikeController.like);


module.exports = router;
