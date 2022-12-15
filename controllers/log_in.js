module.exports.logIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('log_in');
}