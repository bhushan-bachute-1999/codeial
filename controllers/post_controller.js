const Post = require('../models/post');

module.exports.post = (req, res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, posts) {
        if (err) {
            console.log(`Error in creating the post ${err}`);
            return;
        }

        return res.redirect('back');
    });
}