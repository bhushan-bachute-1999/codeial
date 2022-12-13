const User = require('../models/user');

module.exports.validate = function (req, res) {
    let email = req.query.email;
    let password = req.query.password;
    console.log(`Email : ${email} and Password : ${password}`);

    //Check if user exist already
    User.findOne({email: email}, function (err, user) {
        if (err) {
            console.log(`Error in seraching user while log in ${err}`);;
            return;
        }
        
        if (user) {
            //User email found
            if (user.password != password) {//Check if password entered is correct or not
                return res.redirect('back');
            }

            //If password entered is correct
            res.cookie('user_id', user._id);
            return res.redirect('/user/profile');
        }
        else {
            //User not found
            return res.redirect('back');

        }
    })
}