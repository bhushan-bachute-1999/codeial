const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/user_controller');
const postController = require('../controllers/post_controller');
const commentController = require('../controllers/comment_controller');
const createCommentController = require('../controllers/create_comment');
const postLikeController = require('../controllers/post_like');
const validateController = require('../controllers/validateUser');

// router.get('/profile', userController.profile);//No authentication to go to profile page
router.get('/profile', passport.checkAuthentication, userController.profile);//Go to profile page only when user is authenticated
router.post('/editProfile/', userController.editProfile);
router.post('/post', passport.checkAuthentication, postController.post);
router.get('/comment', passport.checkAuthentication, commentController.comment);
router.post('/create-comment', createCommentController.create);
router.get('/like/', postLikeController.like);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/log_in' }), validateController.validate);

module.exports = router;    