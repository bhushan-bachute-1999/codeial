module.exports.sign_up = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('sign_up');
}