const db = require('../config/mongoose1');
const User = require('../models/user');

module.exports.createUser = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        console.log(`Password and confirm password did not match`);
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(`Error in getting user from database ${err}`);
            return;
        }

        console.log(user);
        if (!user) {
            User.create(req.body, function (err, newUser) {
                if (err) {
                    console.log(`Error in creating user ${err}`);
                    return;
                }
                return res.redirect('/log_in');
            });
        }
        else {
            return res.redirect('back');
        }
    });
}