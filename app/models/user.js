'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Create the schema
var usersSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Pease provide the first name',
		trim: true,
		lowercase: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please provide the last name',
		trim: true,
		lowercase: true
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill the user name field',
		trim: true,
		lowercase: true,
		unique: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill the email field',
		trim: true,
		unique: true,
		lowercase: true,
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	role: {
		type: String,
		lowercase: true,
		enum: ['user', 'admin'],
		default: ['user']
	},
	password: {
		type: String,
		default: '',
		required: 'Please provide the password',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
}, {strict: true});


module.exports = mongoose.model('user', usersSchema);