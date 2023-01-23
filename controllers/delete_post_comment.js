const Post = require('../models/post');
const Comment = require('../models/comments');
const { post } = require('./post_controller');
const Like = require('../models/like');
/*
module.exports.deletePost = function (req, res) {
    let postId = req.query.id;
    Post.findById(postId, function (err, post) {
        if (err) {
            console.log(`Error in fetching the post`);
            return;
        }
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: postId }, function (err) {
                if (err) {
                    console.log(`Error in deleting the comments`);
                    return;
                } 
                return res.redirect('back');
            })
        }
        else {
            return res.redirect('back');
        }
    });
}
*/
module.exports.deletePost = async function (req, res) {
    try {
        let postId = req.query.id;

        let posts = await Post.findById(postId);

        if (posts.user == req.user.id) {
            await Like.deleteMany({ likeable: postId, onModel: 'Post' });//Before deleting post delete all likes accociated with the post
            await Like.deleteMany({ likeable: { $in: posts.comment }, onModel: 'Comment' });//Before deleting post delete likes on the post
            
            posts.remove();
            await Comment.deleteMany({ post: postId });//Before deleting post delete all comments

            if (req.xhr) {
                return res.status(200).json({
                    data:{
                        postId : postId
                    },
                    message: "Post deleted!"
                })
            }
            req.flash('success', 'Post deleted successfully');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('success', 'Post deletion failed');
        return res.redirect('back');
    }
}
/*
module.exports.deleteComment = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            console.log(`Error in fetching comment`);
            return;
        }
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            
            Post.findByIdAndUpdate(postId, { $pull: {comment : req.params.id}}, function (err, post) {
                if (err) {
                    console.log(`Error in deleting the comment from comment array`);
                    return;
                }

                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            commentId: req.params.id
                        },
                        message: "Deleted successfully"
                    });
                }
                req.flash('success', 'Comment deleted successfully');
                return res.redirect('back');
            });
        }
        else {
            req.flash('success', 'Comment deletion failed');
            return res.redirect('back');
        }
    });
}
*/
module.exports.deleteComment = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } });
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        commentId: req.params.id
                    },
                    message: "Deleted successfully"
                });
            }
            req.flash('success', 'Comment deleted successfully');
            return res.redirect('back');
        }
        else {
            req.flash('Error', 'Unauthorized for deleting');
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log('Error', error);
        return;
    }
}