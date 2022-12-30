const Comment = require('../models/comments');
const Post = require("../models/post");

/*
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
*/

module.exports.create = async function (req, res) {
    try {
        let id = req.body.postId;

        let posts = await Post.findById(id);

        let comments = await Comment.create({
            content: req.body.comment,
            user: req.user.id,
            post: id
        });

        req.flash('success', 'Commented successfully');
        posts.comment.push(comments);
        posts.save();
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }
}