const Post = require('../models/post');
const Comment = require('../models/comments');
const { post } = require('./post_controller');
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
            posts.remove();
            await Comment.deleteMany({ post: postId });
            req.flash('success', 'Post deleted successfully');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('success', 'Post deletion failed');
        return res.redirect('back');
    }
}

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