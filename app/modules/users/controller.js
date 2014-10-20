'use strict';

// Depnedencies
var mongoose = require('mongoose'),
	model = require('../users/model'),
	users = mongoose.model('users');


module.exports.index = function (req, res) {
	users.find(function (err, user) {
		res.jsonp(user);
	});
}

module.exports.name = function (req, res) {
	users.findOne({name: req.params.name}, function (err, user) {
		if(err){ return res.status(500).jsonp('error: user not found'); }
		if(user === null){ return res.status(404).jsonp('No user has been found'); }
		res.status(200).jsonp(user);
	});
}