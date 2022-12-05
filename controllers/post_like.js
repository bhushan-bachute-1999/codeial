module.exports.like = function (req, res) {
    return res.render('postLike', {
        title: "like",
        heading: "Like button clicked by user"
    });
}