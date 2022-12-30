module.exports.sign_up = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success', 'Sign up successful');
        return res.redirect('/user/profile');
    }
    return res.render('sign_up');
}