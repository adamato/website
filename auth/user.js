var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    display_name : String,

    auth: {
        email        : String,
        password     : String,
    },

});

// generating a hash
userSchema.methods.generateHash = function(password, next){
    return bcrypt.hash(password, bcrypt.genSaltSync(8), null, next);
};

// checking if password is valid
userSchema.methods.validPassword = function(password, next) {
    return bcrypt.compare(password, this.auth.password, next);
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);