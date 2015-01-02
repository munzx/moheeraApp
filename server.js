'use strict';

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

// Initilize with config file
require('./app/config/init')(app, express);

//initilize routes
require('./app/config/routes')(app);

app.listen(port, function () {
	console.log('Bism Allah , Server runs on port 3000');
});