const Comments = require('../models/comments');
const Post = require('../models/post');
/*
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
*/

//Using async-await
module.exports.comment = async function (req, res) {
    try {
        let posts = await Post.findById(req.query.id).
            populate('user').
            populate({
                path: 'comment',
                populate: {
                    path: 'user'
                }
            });
        
        return res.render('comments', {
            postId: req.query.id,
            post: posts
        });
    } catch (error) {
        console.log(`Error in fetching the data`);
        return;
    }
}

//Using promises
/*
module.exports.comment = function (req, res) {
    let posts = new Promise((resolve, reject) => {
        Post.findById(req.query.id).
            populate('user').
            populate({
                path: 'comment',
                populate: {
                    path: 'user'
                }
            });
        resolve();
    }
    );

    posts.then(function () {
        return res.render('comments', {
            postId: req.query.id,
            post: posts
        });
    }).catch((Error) => {
        console.log('Error');
    })
}
*/