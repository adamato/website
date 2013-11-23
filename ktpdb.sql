DROP DATABASE IF EXISTS ktp_db;
CREATE DATABASE ktp_db;
USE mysetup_db;

CREATE TABLE user_profiles(
	user_id INT(32) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	uniqname varchar(255) NOT NULL, first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
);

CREATE TABLE profile_description(
	user_id INT(32) NOT NULL REFERENCES user_profiles(user_id),
	grad_year INT,
	pledge_year INT,
	major varchar(255),
	concentration varchar(255),
	ktp_orgs varchar(255),
	bio varchar(1000),
	prof_pic varchar(255)
);
CREATE TABLE links(
	user_id INT(32) NOT NULL REFERENCES user_profiles(user_id),
	url varchar(255)
);
CREATE TABLE status(
	user_id INT(32) NOT NULL REFERENCES user_profiles(user_id),
	status varchar(255) NOT NULL
);
CREATE TABLE service(
	user_id INT(32) NOT NULL REFERENCES user_profiles(user_id),
	hours INT NOT NULL,
	description varchar(1000) NOT NULL,
	organization varchar(255) NOT NULL
);

