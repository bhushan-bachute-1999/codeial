//Controller for home page route URL = "/"
module.exports.home = function (req, res) {
    console.log(req.cookies);
    res.cookie('greet', 'Good evening');
    return res.render('home', {
        title: "Home",
        heading: "Codeial home page"
    });
}