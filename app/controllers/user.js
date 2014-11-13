'use strict';

// Depnedencies
var mongoose = require('mongoose'),
	users = require('../models/user');

// get all users
module.exports.index = function (req, res){
	users.find(function (err, user){
		if(err){
			res.status(500).jsonp(err);
		} else if(user){
			res.status(200).jsonp(user);
		} else {
			res.status(404).json('No user has been found');
		}
	});
}

// create a new user
module.exports.create = function(req, res){
	var newUser = new users(req.body);
	newUser.save(function(err, user){
		if(err){
			res.status(500).jsonp(err);
		} else {
			res.status(200).jsonp(user);
		}
	});
}

// get user by name
module.exports.getByName = function (req, res){
	users.findOne({name: req.params.name}, function(err, user) {
		if(err){
			res.status(500).jsonp(err);
		} else if(user){
			res.status(200).jsonp(user);
		} else {
			res.status(404).json('User has not been found');
		}
	});
}

//update user by id
module.exports.update = function(req, res){
	users.findOneAndUpdate({_id: req.user._id}, req.body, function(err, user, numOfAffectedRows){
		if(err){
			res.status(500).jsonp(err);
		} else if(user) {
			res.status(200).jsonp(user);
		} else {
			res.status(404).json('User has not been found');
		}
	});
}

//delete user by id
module.exports.delete = function(req, res){
	users.findOneAndRemove({_id: req.user._id}, function(err, numOfAffectedRows){
		if(err){
			res.status(500).jsonp(err);
		} else if(numOfAffectedRows === 0) {
			res.status(404).json('User has not been found');
		} else {
			res.status(200).json('User has been deleted successfully');
		}
	});
}