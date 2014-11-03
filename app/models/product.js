'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var productSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Fill up the product name',
		trim: true,
		unique: true
	},
	desc: {
		type: String,
		default: '',
		required: 'Fill up the product describtion',
		trim: true
	},
	category: {
		type: String,
		default: '',
		required: 'Fill up the category',
		trim: true
	},
	image: {
		type: String,
		default: '',
		required: 'Please provide image',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
}, {strict: true});


module.exports = mongoose.model('product', productSchema);