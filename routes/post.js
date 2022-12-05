const express = require('express');
const router = express.Router();
const postLikeController = require('../controllers/post_like');

router.get('/like', postLikeController.like);

module.exports = router;