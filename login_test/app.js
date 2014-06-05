var express = require('express'),
	path = require('path'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
//CHANGED SOME SHIT ABOVE 

var app = express();
    
app.listen(9900,function(){
	console.log('KTP web server listening on port 9900!');
});

app.set('views','views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static('public'));

//ADDED BELOW
app.use(express.favicon());
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
//END ADD

// passport config (added)
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// mongoose (if we use?)
mongoose.connect('mongodb://localhost/'); //change this to server info 

// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/", { native_parser: true }); //again change here

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make db accessible to router
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);

//ADDED ABOVE



app.get('/', function (req,res) {
	res.sendfile('public/index.html');
});

app.post('/interest', function (req, res) {
	var str = 'name: ' + req.body.name + ' email: ' + req.body.email + ' year: ' + req.body.year + '\n';
	require('fs').appendFile('data/interest.txt',str, function(err){
		res.send('Thanks!');
	});
});




// Serve up the data directory
//
dataServ.use(express.directory('data'));
dataServ.use(express.static('data'));
dataServ.listen(6969,function(){
	console.log('Servin up 6969!');
});


// pull from repo upon release
//
var exec = require('child_process').exec;
app.post('/api/gitrelease', function (req, res) {
	exec('git pull', function() {
		console.log('pulled update from github');
	});
});

module.exports = app; //not sure if needed 