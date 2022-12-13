module.exports.sign_out = function (req, res) {
    res.clearCookie("user_id",req.cookies.user_id);
    return res.redirect('/log_in');
}