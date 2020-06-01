const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/users');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth...
        User.findOne({ 'googleId': profile.id }, function(err, user) {
            if (err) return cb(err);
            if (user) {
                return cb(null, user);
            } else {
                // New user via OAuth
                var newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                });
                newUser.save(function(err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                });
            }
        });
    }
));

//passport.serializeuser - what we wanna dd to session to remember the user by
passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

//passport.deserializeUser -called with every users request
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      return done(err, user);
    });
});


