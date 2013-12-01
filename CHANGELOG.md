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