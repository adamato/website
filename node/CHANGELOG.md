
12/1 12:12
Node dependencies:
	Need to build list of dependencies, so package.json is created.
	Need to run: (with node and npm installed)
		sudo npm install  
	in order to install server dependencies

Sending requests for public files:
	In order to simulate hosting functions like: php -S <host>:<port>, I added GET requests for the static files.
	Then generalized these git requests to cut down on code reuse