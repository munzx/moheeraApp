'use strict';

//Dependencies
var mongoose = require('mongoose'),
	_ = require('lodash'),
	users = require('../models/user');


module.exports.index = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp(err);
		} else if(user){
			res.status(200).jsonp(user.cart);
		} else {
			res.status(404).jsonp('User han not been found');
		}
	});
}

module.exports.addProduct = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp(err);
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
					res.status(500).jsonp(err);
				} else if(newCart){
					res.status(200).jsonp(userInfo);
				} else {
					res.status(401).json('Failed to add new product to the cart');
				}
			});
		} else {
			res.status(404).jsonp('User has not been found');
		}
	});
}

module.exports.removeProduct = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp(err);
		} else if(user){
			user.cart.id(req.params.productId).remove();
			user.save(function (err) {
				if(err){
					res.status(500).jsonp(err);
				} else {
					res.status(200).json('Product has been removed successfully');
				}
			})
		} else {
			res.status(404).json('User has not been found');
		}
	});
}
