# Carbon101x Marginal Abatement Cost Curve Practical

# Installation

### Request Project and Answer Files
* This repository does not include the answer files (as the Practical is used as a MOOC assessment item). If you are an instructor wishing to deploy the tool as an LTI for a system such as edX, Moodle or Blackboard, please submit an issue on github request and you will be granted access to a private repository with the answer files. 

### Development

1. Start MAMP/MAMP Pro apache server and point to the project directory or clone this project to your mamp's sites folder
2. Run the following command -
> npm run develop

3. Make a copy of the config.php.example, set the config details and remove .example
4. Open your web browser to localhost/path/to/project

These steps will ensure that your js and css are being watched by grunt and will compile, minify and reload your browser on every time you save your changes.

### Production

1. Run the following command -
> npm run build

2. ensure that you have a proper config.php see below for the boiler plate
3. Open inc/header.php and point to the minified js and css files for better performance


### Config.php
```php
<?php
	//Configuration File
	//key=>secret
	$config = array(
		'lti_keys'=>array(
			'YOUR_CLIENT_KEY'=>'YOUR_CLIENT_SECRET'
		),
		'use_db'=>true,
		'db'=>array(
			'driver'=>'mysql',
			'hostname'=>'localhost',
			'username'=>'YOUR_DB_USERNAME',
			'password'=>'YOUR_DB_PASSWORD',
			'dbname'=>'YOUR_DB_NAME',
		)
	);
?>
```
### SQL
```sql

CREATE TABLE `states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` text,
  `lti_id` text NOT NULL,
  `state` mediumtext,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

```

# Config Setup
1. Edit config.php with your respective LTI keys and optional database details
2. Host on a https server (LTI with edX requires HTTPS)
3. Add the respective keys in the edX advanced settings
4. Create a new LTI component and point it to the correct URL

That's it! you're done with the setup :)


# Usage
1. use test.php with LTI to confirm that everything is connecting
2. on each page, include <?php require_once('inc/header.php'); ?> at the top
3. to ensure valid LTI, make sure to run $lti->requirevalid(); directly after header.php
4. for production ensure that test flag is set to false in lib/lti.php

# Testing
For testing we recommend the LTI 1.1 testbed, available at: http://www.imsglobal.org/developers/LTI/test/v1p1/lms.php
