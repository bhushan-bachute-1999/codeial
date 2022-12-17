const Comment = require('../models/comments');
const Post = require("../models/post");

module.exports.create = function (req, res) {
    let postId = req.body.postId;
    Post.findById(postId, function (err, posts) {
        if (err) {
            console.log(`Error in fetching post from database`);
            return;
        }
        Comment.create({
            content: req.body.comment,
            user: req.user.id,
            post: req.body.postId
        }, function (err, comments) {
            if (err) {
                console.log(`Error`);
                return;
            }
            posts.comment.push(comments);
            posts.save();
            return res.redirect('back');
        });
    });
}