var express = require('express'),
	fs = require('fs'),
	formidable = require('formidable'),
	clients = {};
var app = express(), 
	server = require('http').createServer(app);

server.listen(9900,function(){
	console.log('KTP web server listening on port 9900!');
});

app.set('views','views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('dirty secrets'));
app.use(express.session());
app.use(express.static('public'));

app.get('/', function (req,res) {
	res.sendfile('public/index.html');
});

app.get('/application', function (req,res) {
	res.sendfile('public/application.html');
});

app.post('/application', function (req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		console.log( 'submission from ' + fields.name );
		fs.writeFile('./data/'+fields.uniqname+'.application',JSON.stringify(fields), function (err) {
			if(err) console.log(err);
		});
	});
	res.send('<html><body><center><br><h1>Thank you!</h1><h3>See you at Game Night.</h3></center></body></html>');
});