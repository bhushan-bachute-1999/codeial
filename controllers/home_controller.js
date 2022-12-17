//Controller for home page route URL = "/"

const Post = require('../models/post');
module.exports.home = function (req, res) {
    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: "Home",
    //         heading: "Codeial home page",
    //         posts: posts
    //     });
    // });
    // if (req.isAuthenticated()) {//If user is logged in then only display post i.e. home page
        Post.find({}).populate('user').exec(function (err, posts) {
            return res.render('home', {
                title: "Home",
                heading: "Codeial home page",
                posts: posts
            });
        });
    // }
    // else {
    //     return res.redirect('/log_in');
    // }
    
}