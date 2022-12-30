module.exports.setFlash = function (req, res, next) {
    res.locals.flash = {
        'successMsg': req.flash('success'),
        'errorMsg' : req.flash('error')
    }
    next();
}