const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.validate = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
        return res.status(422).json({
            message: "Invalid username or password"
        });
    }

    return res.json(200, {
        message: "Signed in successfully, here is the token please keep it safe",
        data: {
            token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' })
        }
    })
}