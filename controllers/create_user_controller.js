const db = require('../config/mongoose1');
const User = require('../models/user');

module.exports.createUser = function (req, res) {
    User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }, function (err, newUser) {
        if (err) {
            console.log(`Error in creating user ${err}`);
            return;
        }
        console.log(newUser);
        return res.redirect('back');
    });
}