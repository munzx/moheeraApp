'use strict';

var express = require('express'),
	app = express();

// Initilize with config file
require('./app/config/init')(app, express);

//initilize routes
require('./app/config/routes')(app);

app.listen(3000, function () {
	console.log('Bism Allah , Server runs on port 3000');
});