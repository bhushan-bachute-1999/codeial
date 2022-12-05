module.exports.profile = function (req, res) {
    return res.render('user', {
        title: "User",
        heading: "User page rendered via views"
    });
}