var express  = require('express');
var app      = express();
var passport = require('passport'),
    session = require('express-session'),
    store = require('connect-mongo')(session);

require('mongoose').connect('mongodb://localhost:27017/ktpweb');

require('./auth/passport.js')(passport); 

app.set('views',__dirname+'/auth/views');
app.set('view engine','jade');

app.use(require('cookie-parser')()); 
app.use(require('body-parser').urlencoded({extended:true})); 
app.use(session({ 
    secret: 'justinLikesTenticles',
    store: new store({
        db: 'ktpweb'
    }) 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')()); 
 
require('./auth/routes.js')(app,passport);

app.get('/:section', serveIndex);
app.get('/', serveIndex);
function serveIndex (req,res) {
	res.sendfile('public/index.html');
};

app.post('/interest', function (req, res) {
	var str = 'name: ' + req.body.name + ' email: ' + req.body.email + ' year: ' + req.body.year + '\n';
	require('fs').appendFile('data/interest.txt',str, function(err){
		res.send('Thanks!');
	});
});

app.use(express.static(__dirname+'/public'));

app.listen(3000,function(){
	console.log('KTP web server listening on port 3000!');
});
