2/19
Files:
	renamed server.js to app.js, for consistency with node projects
	removed DDom and GGreg files from top level directory
	removed unused files from /public, to clean up file structure and reduce to just what we're using. Check the git if you're looking for past files like the application
	downloaded font and added to css

12/31
File structure:
	moved server files to top level directory, and changed 'vendor' files to 'lib' files, as is consistant with node.js projects. 
	moved public/css/img to public/img.
	removed public/css/header.css

File changes:
	index.html: cleaned up some code and fixed nav-bar, but broke social network links. Added sam's rush info to rush section.
	index.css: moved webkit code to public/lib/css/webkit.css, removed some redundant definitions

Node.js:
	added gruntfile and livereload (commented out at bottom of index.html): server will be run with: grunt
	 this allows logging of file uploads and automatic jshint for debugging.
	 if running server with grunt, changes to any files are made and server is reset with updates automatically.
	finished package.json file for loading node modules. added grunt dev dependencies. 
	install full suite of node packages with npm install --save-dev (might need sudo, requires node.js and npm) 

12/6
beginnings of the member section;
	added bxslider jquery plugin to allow mousing over the list of names to display photos

12/5
lots of changes today, most recent by dom being:
	moved rush and members sections into index.html and removed redundant html files
	moved around some css to simplify the file's we're working with
	used some classes to line up headers the same across pages
	lots of random little things, like changing the main divs to sections (better htmling apparently)
	made some changes to the options of ascensor, like adding the /#/MEMBERS and /#/RUSH url selectors

12/2
Ben added twitter feed bar to home page

12/1
Ben added links to our social media sites (top left of index.html) and styled headers and content sections, including a carousel of our images on the rush page.

12/1 
Structure of website:
	Moved web files into public directory, and vendor files in public/vendor subdirectory, in order to seperate pages loaded for specific requests, and pages used for static loading of webpage.

Node:
	Full server file, capable of ajax and serving website requests located in node file
	To initialize and run the server:
		nodejs node/ktpserver.js
	the server will accept requests on port 9900 by default

DB:
	Due to member/document based objects, going to make the change to mongodb with mongoose node module.
	This is due to the lack of relations in the data we are managing, such that we don't need a full RDBMS.
	Each member is in control of the data they plan to share to the site, so members will be treated as mongo documents.
