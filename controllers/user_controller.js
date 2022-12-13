const User = require('../models/user');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                return res.render('user', {
                    heading: "User's profile",
                    user: user
                })
            }
            else {
                return res.redirect('/log_in');
            }
        })
    }
    else {
        return res.redirect('/log_in');
    }
}