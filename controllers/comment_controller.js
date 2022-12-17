const Comments = require('../models/comments');
const Post = require('../models/post');

module.exports.comment = function (req, res) {
    Post.findById(req.query.id).
        populate('user').
        populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        }).exec(function (err, post) {
            if (err) {
                console.log(`Error in fetching the data`);
                return;
            }
            return res.render('comments', {
                postId: req.query.id,
                post: post
            });
        });
}