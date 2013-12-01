// Tell our node to use the express module
var express = require('express');
// and run our server with this module.
var server = express();

// mongoose coming soon

/*/
*	serves http://0.0.0.0:9900/
*	will serve http://kappathetapi.com/
/*/
server.get('/',function(req,res){
	res.sendfile('public/index.html');
});

/*/
*	load proprietary files from GET request
*	files worked on by members
/*/
server.get('/:type/:file',function(req,res){
	// log to the console which file is being loaded
	// this file is derived from the parameters of the request
	console.log(' ##serving:'+req.params.file);
	// as a response, send back the desired file
	res.sendfile('public/'+req.params.type+'/'+req.params.file);
});

/*/
*	load externally created frameworks and files from GET request
*	usually static or only being updated with new releases 
*	kept in a seperate directory to encapsulate files not written by us
/*/
server.get('/vendor/:type/:file',function(req,res){
	console.log(' ##serving:'+req.params.file);
	res.sendfile('public/vendor/'+req.params.type+'/'+req.params.file);
});

/*/
*	tell our server to 'listen' on the given port
*	this allows us to talk to serve requests on port 9900 while localhosting
/*/
server.listen(9900);
console.log('KTP web server listening on port 9900!');