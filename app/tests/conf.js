'use strict';

var mongoose = require('mongoose');

before(function(done){
	//Connect to mongoDB
	mongoose.connect('mongodb://localhost/test');
	done();
});


after(function(done){
	mongoose.connection.close();
	done();
});