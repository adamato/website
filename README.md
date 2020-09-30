KTP WEBSITE FRAMEWORK  :
=====================  
  
Lightweight and flexible web development.  
Public files to present the front-end.  
Server code to host the back-end.  

File structure:   
:files used to generate website  
public/  
	constitution/		-we the people  
	css/				-stylesheets  
	js/					-scripts  
		/routes.js 		---single-page section transitions  
	img/				-image files (actual files omitted)  
	lib/  				-static frameworks and externally developed files  
		js/				---scripts (mostly jquery)  
		css/ 			---styles (not bootstrap)  
	index.html 			-main page of website  
  
:web server files  
package.json 		-file describing project and node dependencies  
app.js 				-node.js express application  
gruntfile.js 		-automated javascript

:extras
data/				-good ol' port:6969
auth/				-code for login and routing the web-app


HOW TO CONTRIBUTE  :
=================  
  
You can test and run the majority of front end by clicking and dragging public/index.html into a browser nav bar.  
Feel free to make any changes and additions to the git. Be sure to update README whenever you are making a change that requires explanation.  
Please comment sections of non-trivial code.  
  
NODE.JS  :
=======  
Server-side javascript, used to serve our content.  
Download the latest version at http://nodejs.org/download/
