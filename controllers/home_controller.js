//Controller for home page route URL = "/"
module.exports.home = function (req, res) {
    return res.render('home', {
        title: "Home",
        heading: "Codeial home page"
    });
}