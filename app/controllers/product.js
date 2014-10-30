'use strict';

//Dependencies
var mongoose = require('mongoose'),
	products = require('../models/product'),
	users = require('../models/user');


module.exports.index = function(req, res){
	products.find(function(err, product){
		if(err){
			res.status(500).jsonp(err);
		} else {
			res.status(200).jsonp(product);
		}
	});
}

module.exports.create = function(req, res){
	var newProduct = new products(req.body);
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
		} else {
			res.status(200).jsonp(product);
		}
	});
}

module.exports.update = function(req, res){
	products.findOneAndUpdate({_id: req.params.id}, req.body, function(err, product, numOfAffectedRows){
		if(err){
			res.status(500).jsonp(err);
		} else if(numOfAffectedRows === 0){
			res.status(200).json('Failed to update document');
		} else {
			res.status(200).jsonp(product);
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
		} else {
			res.status(200).jsonp(product);
		}
	});
}