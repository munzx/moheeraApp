'use strict';

//Dependencies
var mongoose = require('mongoose'),
_ = require('lodash'),
products = require('../models/product');


module.exports.index = function (req, res) {
	products.findById(req.params.id, function (err, product) {
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			var heart = product.heart;
			if(heart){
				res.status(200).jsonp(heart);
			} else {
				res.status(404).jsonp('No heart has been found!');
			}
		} else {
			res.status(404).json('No product has been found!');
		}
	});
}

module.exports.create = function (req, res) {
	products.findById(req.params.id, function (err, product) {
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			var heartInfo = req.body;
			heartInfo.user = req.user;
			product.heart.push(heartInfo);
			product.save(function (err, newHeart) {
				if(err){
					res.status(500).jsonp(err);
				} else if(newHeart){
					res.status(200).jsonp(newHeart.heart);
				} else {
					res.status(401).json('Failed to add heart');
				}
			});
		} else {
			res.status(404).json('No product has been found!');
		}
	});
}

//Assure the heart owner only can unheart!!
module.exports.delete = function (req, res) {
	products.findOneAndUpdate({_id: req.params.id}, {$pull: {'heart': { '_id': req.params.heartId, 'user._id': req.user._id }} }, function (err) {
		if(err){
			res.status(500).jsonp(err);
		} else {
			res.status(200).jsonp('Product has been unhearted successfully!');
		}
	});
}