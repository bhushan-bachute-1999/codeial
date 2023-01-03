const User = require('../models/user');
const path = require('path');
const fs = require('fs');

module.exports.profile = function (req, res) {
    User.findById(req.query.id, function (err, user) {
        if (err) {
            console.log(`Error in fetching user`);
            return;
        }
        return res.render('user', {
            title: "User",
            heading: "User page rendered via views",
            user_detail: user
        });
    })
}

module.exports.editProfile = async function (req, res) {
    if (req.user.id == req.query.id) {
        try {
            let user = await User.findById(req.query.id);
            
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('multer error', err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    try {
                        if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                    } catch (err) {
                        console.error(err)
                    }  
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch (error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }
    else {
        req.flash('error', 'Unauthorized');
        return res.redirect('back'); 
    }
    // User.findOneAndUpdate(req.body.userId, {
    //     name: req.body.name,
    //     email: req.body.email
    // }, function(err, user) {
    //     if(err) {
    //         console.log(`Error in fetching the user`);
    //         return;
    //     }

    //     return res.redirect('back');
    // });
}