var express = require('express'),
    app = express();
    
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