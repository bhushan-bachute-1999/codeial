const passport = require('passport');
module.exports.sign_out = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(`Error in signing out ${err}`);
            return;
        }
        return res.redirect('/');
    });
}