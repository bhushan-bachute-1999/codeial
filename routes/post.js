const express = require('express');
const router = express.Router();
const passport = require('passport');
const postLikeController = require('../controllers/post_like');
const postController = require('../controllers/post_controller');
const commentController = require('../controllers/comment_controller');
const createCommentController = require('../controllers/create_comment');

router.get('/like', postLikeController.like);
router.post('/post',passport.checkAuthentication, postController.post);
router.get('/comment', passport.checkAuthentication, commentController.comment);
router.post('/create-comment', createCommentController.create);


module.exports = router;