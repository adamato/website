var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var plm = require('passport-local-mongoose');

var Account = new Schema({
	name: String,
	email: String,
	username: String,
	time: { type: Date, default: Date.now }
});

Account.plugin(plm);

module.exports = mongoose.model('Account', Account);