'use strict';

// Depnedencies
var mongoose = require('mongoose'),
errorHandler = require('./error'),
fs = require('fs'),
users = require('../models/user');

// get all users
module.exports.index = function (req, res){
	users.find({password: 0}, function (err, user){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			res.status(200).jsonp(user);
		} else {
			res.status(404).json({message: 'No user has been found'});
		}
	});
}

// create a new user
module.exports.create = function(req, res){
	var newUser = new users(req.body);
	newUser.save(function(err, user){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(user);
		}
	});
}

// get user by name
module.exports.getByName = function (req, res){
	users.findOne({name: req.params.name}, {password: 0}, function(err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			res.status(200).jsonp(user);
		} else {
			res.status(404).json({message: 'User has not been found'});
		}
	});
}

//update user by id
module.exports.update = function(req, res){
	console.log(JSON.stringify(req.files));

	users.findOneAndUpdate({_id: req.user._id}, req.body, function(err, user, numOfAffectedRows){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user) {
			res.status(200).jsonp(user);
		} else {
			res.status(404).json({message: 'User has not been found'});
		}
	});
}

//update the user password
module.exports.changePassword = function(req, res){
	users.findOneAndUpdate({_id: req.user._id, password: req.body.currentPassword}, {"password": req.body.newPassword},function(err, user){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			res.status(200).jsonp(user);
		} else {
			res.status(401).json({message: 'Current password is not correct'});
		}
	});
}

//delete user by id
module.exports.delete = function(req, res){
	users.findOneAndRemove({_id: req.user._id}, function(err, numOfAffectedRows){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(numOfAffectedRows === 0) {
			res.status(404).json({message: 'User has not been found'});
		} else {
			res.status(200).json({message: 'User has been deleted successfully'});
		}
	});
}