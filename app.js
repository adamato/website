var express = require('express'),
    app = express(),
    dataServ = express();
    
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

app.get('/', function (req,res) {
	res.sendfile('public/index.html');
});

app.get('/interest', function (req, res) {
	console.log(req.body);
	res.send('Thanks!');
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