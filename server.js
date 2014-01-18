var express = require('express'),
	db = require('./db.js'),
	http = require('http'),
	clients = {};
var app = express(), 
	server = require('http').createServer(app), 
	io = require('socket.io').listen(server);

app.listen(9900,function(){
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

app.get('/',function(req,res){
	res.send('public/index.html');
});

io.sockets.on('connection', function (socket) { 
		
	clients[socket.id] = socket;

	socket.on('chat', function (data) {
		app.render('post',{name:data.user,time:new Date(),text:data.text}, function (err,html) {
			if(err) console.log(err);
			socket.broadcast.emit('chatter',html);
		});
	});

});

