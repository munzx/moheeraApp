'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Create the schema
var usersSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Pease provide the first name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please provide the last name',
		trim: true
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill the user name field',
		trim: true,
		unique: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill the email field',
		trim: true,
		unique: true,
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	role: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	password: {
		type: String,
		default: '',
		required: 'Please provide the password',
		trim: true
	}
}, {strict: true});


module.exports = mongoose.model('user', usersSchema);