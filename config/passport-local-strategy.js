const passport = require('passport');
const LocalPassport = require('passport-local').Strategy;
const User = require('../models/user');

//Authenticate the user using passport
passport.use(new LocalPassport({
        usernameField: 'email'
    },
    function (email, password, done) {
        console.log(`In passport configuration`);
        //Find the user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log(`Error in fetching the user ${err}`);
                return done(err);
            }

            //User not present in database or password did not match
            if (!user || user.password != password) {
                console.log(`Invalid user/ password`);
                return done(null, false);//No error just authentication is false
            }

            //User found
            console.log(`user found`);
            return done(null, user);
        });
    }
));

//serialize the user. Which id is passed to cookie
passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

//deserialize the user form key in the cookie
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log(`Error in fetching the user ${err}`);
            return done(err);
        }
        return done(null, user);
    });
});


//Check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //User is authenticated
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/log_in');
}

//Set the user for views
passport.setAuthenticateUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;