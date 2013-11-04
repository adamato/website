KTPDEV framework  
=======================  
  
Introduction  
------------  
The source of the new website under development. Feel free to 
contribute wherever you'd like.  
   
FRONT-END:  
Consider working on CONTENT, STRUCTURE or STYLING with a group to 
implement a component. 

Most STRUCTURE work done in ./module/Application/view/application/index/index.phtml  
and ./module/Application/view/layout/layout.phtml.  

Most STYLING work done in ./public/css and ./public/js  
along with additional tweaks to STRUCTURE files. 

Most CONTENT work done over google docs and in meetings.  

    
BACK-END:
Pass variables to front end through 
Application view controller in ./module/Application/src/Application/Controller/IndexController.php  

Profiles and Calenders will be implemented in seperate modules  


Installation  
------------  
*Disclaimer  
This guide is currently geared toward building on linux. 
Please add more if you work through building on another OS.
  

To install dependencies:   
  
./composer.phar self-update  
./composer.phar install  


Virtual Host
------------  
0: Establish Virtual Host (apache2 on linux)  
cd /etc/apache2/sites-available  
vim ktpweb (and insert the following)  
<VirtualHost *:80>  
	ServerName ktpweb.localhost  
	DocumentRoot /var/www/ktpweb/public  
	SetEnv APPLICATION_ENV "development"  
	<Directory /var/www/ktpweb/public>  
		DirectoryIndex index.php  
		AllowOverride All  
		Order allow,deny  
		Allow from all    
	</Directory>  
</VirtualHost>  
:wq  
sudo a2ensite ktpweb  
sudo service apache2 restart  
  
1: Tell your computer to recognize the localhost
edit /etc/hosts  
after 127.0.0.1 add ktpweb.localhost  

2: Config ZF2 for database
cd ./config/autoload  
(more on this once we use more database)  
