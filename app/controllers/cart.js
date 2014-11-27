'use strict';

//Dependencies
var mongoose = require('mongoose'),
	_ = require('lodash'),
	errorHandler = require('./error'),
	users = require('../models/user');


module.exports.index = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			res.status(200).jsonp(user.cart);
		} else {
			res.status(404).jsonp({message: 'User han not been found'});
		}
	});
}

module.exports.addProduct = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			var newCart = {
				name: req.body.name,
				desc: req.body.desc,
				category: req.body.category,
				image: req.body.image,
				productId: req.params.productId
			};
			user.cart.push(newCart);
			user.save(function (err, userInfo) {
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else if(newCart){
					res.status(200).jsonp(userInfo);
				} else {
					res.status(401).json({message: 'Failed to add new product to the cart'});
				}
			});
		} else {
			res.status(404).jsonp({message: 'User has not been found'});
		}
	});
}

module.exports.removeProduct = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			user.cart.id(req.params.productId).remove();
			user.save(function (err) {
				if(err){
					res.status(500).jsonp(err);
				} else {
					res.status(200).json({message: 'Product has been removed successfully'});
				}
			})
		} else {
			res.status(404).json({message: 'User has not been found'});
		}
	});
}
