KTP WEBSITE FRAMEWORK  
=====================  
  
Lightweight and flexible web development.  
Public files to present the front-end.  
Server code to host the back-end.  
  
File structure:*   
public/  				:files used to generate website  
	css/				-stylesheets  
	html/				-html pages  
		/members.html 	---members page
		/rush.html 		---rush page
	js/					-scripts  
		/index.js 		---ascensor ui actions and loading other divs
	img/				-image files (actual files omitted)
	vendor/  			-static frameworks and externally developed files  
		js/				---scripts (mostly jquery)  
		css/ 			---styles (bootstrap)  
	index.html 			-main page of website
  
node/					:web server files  
	package.json 		-file describing project and node dependencies  
	server.js 			-node.js file to serve up pages from within the framework  

data/					:holds database files and schemas  
  
*from this directory; not including readmes and changelogs  
  
To run the full server, you can either download and install nodejs, or use the compiled version if it works on your system*:
./node/nodejs node/server.js
Can test and run the majority of front end by clicking and dragging public/index.html into a browser nav bar. 
*it seems that this compiled version doesn't work on mac, but you can run the full server by double clicking index.html from finder.
  

HOW TO CONTRIBUTE  
=================  
  
Feel free to make any changes and additions to the git. Be sure to update READMEs and CHANGELOGs whenever you are making a change that requires explanation.
Please comment sections of non-trivial code.  
  