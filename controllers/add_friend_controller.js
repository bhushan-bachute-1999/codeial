const Friend = require('../models/friendship');
const User = require('../models/user');

module.exports.addFriend = async function (req, res) {
    try {
        let user = await User.findById(req.user.id);
        let added = false;
        let friendExist = await Friend.findOne({
            from_user: req.user.id,
            to_user: req.query.fid
        });

        let msg;
        if (friendExist) {
            await User.findByIdAndUpdate(req.user.id, { $pull: { friendships: friendExist.id } });
            friendExist.remove();
            user.save();
            msg = 'Unfollow friend';
        }
        else {
            let newFriend = await Friend.create({
                from_user: req.user.id,
                to_user: req.query.fid
            });
            user.friendships.push(newFriend);
            user.save();
            msg = 'Friend request send';
            added = true;
        }
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    added: added
                },
                message: msg
            })
        }
        req.flash('success', msg);
        return res.redirect('back');
    }
    catch (error) {
        console.log("Error in adding friend", error);
        return;
    }
}