'use strict';

var passport = require('passport'),
	mongoose = require('mongoose'),
	user = require('../../models/user'),
	passportLocal = require('passport-local');

module.exports = function () {
	//initilize passport local strategy
	//exculde password
	passport.use(new passportLocal.Strategy(function(username, password, done){
		user.findOne({name: username, password: password}, {password: 0}, function(err, user){
			if(err){
				done(err);
			} else {
				done(null, user);
			}
		});
	}));

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});


	//exclude password
	passport.deserializeUser(function(id, done){
		user.findOne({_id: id}, {password: 0}, function(err, user){
			if(err){
				done(err);
			} else {
				done(null, user)
			}
		});
	});
}(); //initilize passport