var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {

	app.get('/', function (req, res) {
		res.render('index', { title: 'KTP', user: req.user });
	});


	app.get('/profile', function (req, res) { //Use a directory format?
		res.render('profile', {title: 'Directory'})
	});

	app.post('/register', function (req, res) {
		Account.register(
			new Account({ 
				name : req.body.name,
				email : req.body.email,
				username : req.body.username 
			}),
			req.body.password, function (err, account) {
				if (err) {
					return res.render('error', { 
						message: 'Account already exists. Try logging in.' 
					});
				}

				passport.authenticate('local')(req, res, function () { //change local
					res.redirect('/');
				});
		});
	});

	app.post('/login', passport.authenticate('local'), function (req, res) { //change local
		res.redirect('/');
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};