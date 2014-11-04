'use strict';

//Dependencies
var mongoose = require('mongoose'),
	products = require('../models/product'),
	users = require('../models/user');


module.exports.index = function(req, res){
	products.find(function(err, product){
		if(err){
			res.status(500).jsonp(err);
		} else if(product) {
			res.status(200).jsonp(product);
		} else {
			res.status(404).json('No product has been found');
		}
	});
}

module.exports.create = function(req, res){
	var newProduct = new products(req.body);
	newProduct.user = req.user;

	newProduct.save(function(err, product){
		if(err){
			res.status(500).jsonp(err);
		} else {
			res.status(200).jsonp(product);
		}
	});
}

module.exports.getByName = function(req, res){
	products.findOne({name: req.params.name}, function(err, product){
		if(err){
			res.status(500).jsonp(err);
		} else if(product) {
			res.status(200).jsonp(product);
		} else {
			res.status(404).json('Product has not been found');
		}
	});
}

module.exports.update = function(req, res){
	products.findOneAndUpdate({_id: req.params.id}, req.body, function(err, product, numOfAffectedRows){
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			res.status(200).jsonp(product);
		} else {
			res.status(200).json('Failed to update document');
		}
	});
}

module.exports.delete = function(req, res){
	products.findOneAndRemove({_id: req.params.id}, function(err, numOfAffectedRows){
		if(err){
			res.status(500).jsonp(err);
		} else if(numOfAffectedRows === 0){
			res.status(200).json('Failed to delete document');
		} else {
			res.status(200).json('successfully deleted the product');
		}
	});
}

module.exports.categoryName = function(req, res){
	products.find({category: req.params.category}, function(err, product){
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			res.status(200).jsonp(product);
		} else {
			res.status(404).json('No product has been found');
		}
	});
}