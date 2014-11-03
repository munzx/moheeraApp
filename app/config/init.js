'use strict';

//Module dependencies
var logger = require('express-logger'),
	errorHandler = require('errorhandler'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	methodOverride = require('method-override'),
	busboy = require('connect-busboy'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	passportLocal = require('passport-local'),
	passportHttp = require('passport-http');


module.exports = function (app, express) {

	//Connect to mongoDB
	mongoose.connect('mongodb://localhost/test');

	//check if mongodb is connected otherwise throw an error
	var db = mongoose.connection;
	db.on('error',console.error.bind(console, 'connection Error:'));

	//Set app defaults
	app.disable('x-powered-by'); //Dont show that this server runs express!
	app.set('env','development'); //We are in development mode
	app.disable('case sensitive routing');
	app.enable('strict routing');
	app.set('view engine', 'ejs');
	app.enable('view cache');
	//process.env.NODE_ENV = 'development'

	if (app.get('env') === 'development') {
		//stop Etag
		app.disable('etag');

		//Log file location
		app.use(logger({path: "log.txt"}));

		//configure error
	    app.use(errorHandler({
	        dumpExceptions: true,
	        showStack: true
	    }));

	    app.use(errorHandler());
	}

	//use middlewears
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(busboy());
	app.use(cookieParser()); //read cookies
	app.use(session({ secret: process.env.SESSION_SECRET || 'secret', saveUninitialized: false, resave: false})); //use sessions for Auth
	app.use(methodOverride()); //read about this
	app.use(passport.initialize()); //initialize passport
	app.use(passport.session()); // persistent login sessions



	//Publically accessable folders
	app.use('/asset', express.static('./bower_components/'));
	app.use('/public', express.static('./public/'));
}