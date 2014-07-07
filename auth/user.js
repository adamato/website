var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    display_name : String,

    auth: {
        email        : String,
        password     : String,
    },

});

// hash the password so our admin can't read them
userSchema.methods.generateHash = function(password, next){
    return bcrypt.hash(password, bcrypt.genSaltSync(8), null, next);
};

// this allows us to validate a password in ciphertext
userSchema.methods.validPassword = function(password, next) {
    return bcrypt.compare(password, this.auth.password, next);
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);