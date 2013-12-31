// Tell our node to use the express module
var express = require('express');
// and run our server with this module.
var app = express();

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

/*/
*	tell our server to 'listen' on the given port
*	this allows us to talk to serve requests on port 9900 while localhosting
/*/
app.listen(9900,function(){
	console.log('KTP web server listening on port 9900!');
});