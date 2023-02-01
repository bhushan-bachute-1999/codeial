const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env = require('./environment');

let options = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(options, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function (err, user) {
        if (err) {
            console.log("Error in fetching user for JWT payload", err);
            return;
        }

        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));

module.exports = passport;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2FkNjA5ZGVlZjYxOWJlNDBiMzVlODQiLCJlbWFpbCI6ImJodXNoYW4uYmFjaHV0ZS4xOTk5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJuYW1lIjoiQmh1c2hhbiIsImNyZWF0ZWRBdCI6IjIwMjItMTItMjlUMDk6NDA6NDUuOTIzWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMDNUMTc6MDk6MzUuMjYwWiIsIl9fdiI6MCwiYXZhdGFyIjoiXFx1cGxvYWRzXFx1c2VyXFxhdmF0YXJzL2F2YXRhci0xNjcyNzY1Nzc1MjQ4IiwiaWF0IjoxNjcyODQ2NDkzLCJleHAiOjE2NzI4NDY1OTN9.YxS4-j17fXQ5hLNWcbX_BTbzZuAYmw_z7p6Tcz3BJFM
//63b59cf05efcd0899f6ecb38