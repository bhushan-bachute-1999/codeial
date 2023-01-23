const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.like = async function (req, res) {
    try {
        let likeable;
        let deleted = false;
        if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        
        let likeExist = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user.id
        });

        if (likeExist) {
            likeable.likes.pull(likeExist.id);
            likeable.save();
            likeExist.remove();
            deleted = true;
        }
        else {
            let newLike = await Like.create({
                user: req.user.id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: likeable,
                    deleted: deleted
                },
                message: "Post liked successfully"
            })
        }
        req.flash('success', `${req.user.name} liked post`);
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        return;
    }
}