const express = require('express');
const router = express.Router();
const passport = require('passport');
const deletePostController = require('../controllers/delete_post_comment');

router.get('/post', passport.checkAuthentication, deletePostController.deletePost);
router.get('/comment/:id', passport.checkAuthentication, deletePostController.deleteComment);

module.exports = router;