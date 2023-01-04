const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

module.exports.index = async function (req, res) {
    let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });
    return res.status(200).json({
        message: "List of posts",
        posts: posts
    });
}

module.exports.deletePost = async function (req, res) {
    try {
        let postId = req.query.id;
        let posts = await Post.findById(postId);
        
        if (posts.user == req.user.id) {
            posts.remove();
        
            await Comment.deleteMany({ post: postId });
            return res.status(200).json({
                message: "Post and associated comments deleted succesfully"
            });
        }
        else {
            return res.status(401).json({
                message: "You are not authorized to delete the post"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

