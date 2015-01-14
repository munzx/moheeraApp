'use strict';

//Module dependencies
var logger = require('express-logger'),
	errorHandler = require('errorhandler'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	multer  = require('multer'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	passportLocal = require('passport-local'),
	favicon = require('serve-favicon'),
	env = process.env.NODE_ENV,
	envConfig = require('./env/' + process.env.NODE_ENV) || {};

module.exports = function (app, express) {
	//Environment
	console.log(envConfig.app.title + ' Environment');

	//Connect to mongoDB
	mongoose.connect(envConfig.db || process.env.MONGO_URL);

	//Set certain behaviour for development and test environments
	if(env === 'development' || 'test'){
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

	//check if mongodb is connected otherwise throw an error
	var db = mongoose.connection;
	db.on('error',console.error.bind(console, 'connection Error:'));

	//App favicon
	app.use(favicon('./public/modules/home/img/favicon.ico'));

	//Set app defaults
	app.disable('x-powered-by'); //Dont show that this server runs express!
	app.set('env','development'); //We are in development mode
	app.disable('case sensitive routing');
	app.enable('strict routing');
	app.set('view engine', 'ejs');
	app.enable('view cache');

	//use middlewears
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(multer({ 
		dest: './public/uploads/',
		limits: {
		  fieldNameSize: 100,
		  files: 4,
		  fileSize: 10000000000
		}
	}));
	app.use(cookieParser()); //read cookies
	app.use(session({ secret: process.env.SESSION_SECRET || 'secret', saveUninitialized: false, resave: false})); //use sessions for Auth
	app.use(methodOverride()); //read about this
	app.use(passport.initialize()); //initialize passport
	app.use(passport.session()); // persistent login sessions

	//Publically accessable folders
	app.use('/asset', express.static('./bower_components/'));
	app.use('/public', express.static('./public/'));
}