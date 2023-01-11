const Comment = require('../models/comments');
const Post = require("../models/post");
const User = require("../models/user");
const commentEmailWorker = require('../workers/comment_mailer_worker');
const queue = require('../config/kue');

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

        let comment = await Comment.create({
            content: req.body.comment,
            user: req.user.id,
            post: id
        });

        posts.comment.push(comment);
        posts.save(); 

        comment = await comment.populate('user', 'name email');
        // commentMailer.newComment(comment);
        let job = queue.create('emails', comment).save(function (err) {
            if (err) {
                console.log("Error in sending to queue", err);
                return;
            }
            console.log('Job enquued', job.id);
        })

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Comment created"
            })
        }
        req.flash('success', 'Commented successfully');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }
}