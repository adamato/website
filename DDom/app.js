// modules used by our app
var express = require('express.io'),
	db = require('./db.js'),
	clients = {};
var app = express();
	app.http().io(); 

app.listen(3000,function(){
	console.log('Ready to go on port 3000');
});

app.set('views','views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
// app.use(express.cookieParser({secret: 'dirty secrets'}));
// app.use(express.session());
app.use(express.static('public'));

app.get('/', function (req,res) {
	res.render('index',{});
});

db.init( function (Forum,Chat) {

// Chat functionality

	app.get('/chat/:room', function (req,res) {
		Chat.load(req.params.room, function (chat) {
			if(chat !== undefined){
				res.render('chat',{room:req.params.room,msgs:chat.msgs});
			}
			else res.render('chat',{room:req.params.room,msgs:[]});
		});
	});

	app.io.route('chat', function (req) {
		req.io.join(req.data.room);
		Chat.add(req.data.room,{text:req.data.text,user:req.socket.id}, function() {
			app.render('post',{user:req.socket.id,time:new Date(),text:req.data.text}, function (err,html) {
				if(err) console.log(err);
				req.io.room(req.data.room).broadcast('chatter',html);
			});
		});
	});

// Forum functionality

	app.io.route('committees', function (req) {
		Forum.load( function (committees) {
			req.io.respond(committees);
		});
	});

	app.io.route('projects', function (req) {
		req.io.leave(req.data.room);
		Forum.load(req.data.committee, function (projects) {
			req.io.respond(projects);
		});
	});

	app.io.route('topics', function (req) {
		req.io.leave(req.data.room);
		Forum.load(req.data.committee,req.data.project, function (topics) {
			req.io.respond(topics);
		});
	});

	app.io.route('posts', function (req) {
		req.io.leave(req.data.room);
		req.io.join(req.data.committee+'-'+req.data.topic);
		Forum.load(req.data.committee, req.data.project, req.data.topic, function (posts) {
			req.io.respond({posts:posts,room:req.data.committee+'-'+req.data.topic});
		});
	});

	app.io.route('newPost', function (req) {
		Forum.add(req.data.committee, req.data.project, req.data.topic, {user:req.socket.id,text:req.data.text,time:new Date()}, function (added) {
			req.io.room(req.data.committee+'-'+req.data.topic).broadcast('sentPost',added);
		});
	});

});

