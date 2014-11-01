'use strict';

var passport = require('passport'),
	passportLocal = require('passport-local');

module.exports = function () {
	//initilize passport local strategy
	passport.use(new passportLocal.Strategy(function(username, password, done){
		if(username === password){
			done(null, {id: username,  message: 'Bism Allah'});
		} else {
			done(new Error('test'));
		}
	}));

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		done(null, {id: id, message: 'Bism Allah'});
	});
}(); //initilize passport