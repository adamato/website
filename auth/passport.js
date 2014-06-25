var LocalStrategy = require('passport-local').Strategy;
var User = require('./user.js');


module.exports = function (passport) {

    // load and store user into / out of session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, done);
    });

    // LOCAL SIGNUP 
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({ 'auth.email' :  email }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    var newUser = new User();
                    newUser.auth.email = email;
                    newUser.generateHash(password, function(err, hash) {
                        if (err) throw err;
                        newUser.auth.password = hash;
                        newUser.save(function(err) {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    });
                }
            });    
        });
    }));

    // LOCAL LOGIN 
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 
        User.findOne({ 'auth.email' :  email }, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            user.validPassword(password, function(err, valid) {
                if (err) throw err;
                if (!valid) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                else return done(null, user); // all is well, return successful user 
            });
        });
    }));

};