const User = require('../models/user');

module.exports.profile = function (req, res) {
    User.findById(req.query.id, function (err, user) {
        if (err) {
            console.log(`Error in fetching user`);
            return;
        }
        return res.render('user', {
            title: "User",
            heading: "User page rendered via views",
            user_detail: user
        });
    })
}

module.exports.editProfile = function (req, res) {
    User.findOneAndUpdate(req.query.userId, {
        name: req.query.name,
        email: req.query.email
    }, function(err, user) {
        if(err) {
            console.log(`Error in fetching the user`);
            return;
        }

        return res.redirect('back');
    });
}