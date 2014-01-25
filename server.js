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
