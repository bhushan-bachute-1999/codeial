const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "139427455410-0l1vc77pkse7siojcbtkq625eootbah9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/user/auth/google/callback"
},
function (accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value })
        .exec((error, user) => {
            if (error) {
                console.log("Error in google strategy passport", error);
                return;
            }

            console.log(profile);
            if (user) {
                done(null, user);
            }
            else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value
                }, function (err, user) {
                    if (err) {
                        console.log("Error in creating user", err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
}
));
module.exports = passport;