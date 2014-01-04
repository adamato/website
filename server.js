var express = require('express'),
	mongo = require('mongoose'),
	formidable = require('formidable');
var app = express();
mongo.connect('mongodb://localhost/interestInfo');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static('public'));

/*/
*	serves http://0.0.0.0:9900/
*	will serve http://kappathetapi.com/
/*/
app.get('/',function(req,res){
	res.send('public/index.html');
});


/*/	Database init for interest form
/*/
var rushSchema = new mongo.Schema({
	Name: String,
	Email: String,
	Year: String
});

var Rush = mongo.model('Rush', rushSchema);
/*/
*	process form input and store in database
/*/
app.post('/interest',function(req,res){
	console.log('interested');
	console.log(req.body);
	var rush = new Rush({
		Name: req.body.name,
		Email: req.body.email,
		Year: req.body.year
	});
	rush.save(function(err){
		if(err){
			console.log(err);
			res.send('An error has occured processing the form');
			return;
		}
		res.send(true);
		return;
	});
});

/*/
*	tell our server to 'listen' on the given port
*	this allows us to talk to serve requests on port 9900 while localhosting
/*/
app.listen(9900,function(){
	console.log('KTP web server listening on port 9900!');
});