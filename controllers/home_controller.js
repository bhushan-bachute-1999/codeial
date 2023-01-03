//Controller for home page route URL = "/"
const Post = require('../models/post');
const User = require('../models/user');

/*
module.exports.home = function (req, res) {
    // if (req.isAuthenticated()) {//If user is logged in then only display post i.e. home page

    Post.find({}).populate('user').exec(function (err, posts) {
        User.find({}, function (err, users) {
            if (err) {
                console.log(`Error in fetching the user`);
                return;
            }
            return res.render('home', {
                title: "Home",
                heading: "Codeial home page",
                posts: posts,
                all_user: users
            });
        })
        
    });

}
*/

module.exports.home = async function (req, res) {
    // if (req.isAuthenticated()) {//If user is logged in then only display post i.e. home page

    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user');

        let users = await User.find({});

        return res.render('home', {
            title: "Home",
            heading: "Codeial home page",
            posts: posts,
            all_user: users
        });
    } catch (error) {
        console.log(`Error in fetching the user`);
        return;
    }

}