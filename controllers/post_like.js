module.exports.like = function (req, res) {
    req.flash('success', 'Post liked');
    return res.redirect('back');
}