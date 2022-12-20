const Post = require('../models/post');
const Comment = require('../models/comments');

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
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    });
}