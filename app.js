var express  = require('express');
var app      = express();

// require('./auth/init')(app); // uncomment for login (mongodb dependency)

app.get('/constitution', function (req, res) {
    res.sendfile('public/constitution/index.html');
});

app.post('/interest', function (req, res) {
	var str = 'name: ' + req.body.name + ' email: ' + req.body.email + ' year: ' + req.body.year + '\n';
	require('fs').appendFile('data/interest.txt',str, function(err){
		res.send('Thanks!');
	});
});

app.get('/:section', serveIndex);
app.get('/', serveIndex);
function serveIndex (req,res) {
    res.sendfile('public/index.html');
}

app.use(express.static(__dirname+'/public'));

app.listen(3000,function(){
	console.log('KTP web server listening on port 3000!');
});
