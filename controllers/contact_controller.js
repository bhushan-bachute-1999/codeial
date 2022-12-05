module.exports.contact = function (req, res) {
    return res.render('contact', {
        title: "Contact",
        heading: "Contact page renderd via views"
    });
}