const Post = require('../models/post');
const User = require('../models/user');

/*
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
*/

module.exports.post = async (req, res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        let users = await User.findById(req.user.id);
        
        //if request is ajax request
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post,
                    user_name: users.name
                },
                message: "Post created successfully!"
            })
        }
        req.flash('success', 'Post created successfully');
        return res.redirect('back');
    } catch (error) {
        req.flash('success', 'Post creation failed');
        return res.redirect('back');
    }
}
