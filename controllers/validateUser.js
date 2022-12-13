const User = require('../models/user');

module.exports.validate = function (req, res) {
    let email = req.query.email;
    let password = req.query.password;
    console.log(`Email : ${email} and Password : ${password}`);

    User.find({email: email}, function (err, userEmail) {
        if (err) {
            console.log(`User email id not found`);
            return;
        }
        User.find({password: password}, function (err, userPassword) {
            if (err) {
                console.log(`Password not match`);
                return;
            }

            return res.send(`<h1>User validated </h1>`);
        });
    })
}