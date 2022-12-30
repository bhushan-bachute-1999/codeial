module.exports.validate = function (req, res) {
    req.flash('success', 'Logged in successfully!!!');
    return res.redirect('/');
}