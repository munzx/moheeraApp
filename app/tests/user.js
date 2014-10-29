'use strict';

var expect = require('expect.js'),
	superagent = require('superagent'),
	mongoose = require('mongoose'),
	user = require('../models/user');

var baseUser;

describe("useres test", function() {

	it("should create a new user", function(done) {
		superagent.post('http://localhost:3000/user')
		.send({
			name: 'moe',
			email: 'moe@test.com'
		})
		.end(function(res){
			expect(res.body.name).to.be('moe');
			expect(res.body.email).to.be('moe@test.com');
			expect(res.status).to.be(200);
			baseUser = res.body;
			done();
		});
	});
	it("should refuse to craete a duplicate user name", function(done) {
		superagent.post('http://localhost:3000/user')
		.send({
			name: 'moe',
			email: 'moe@test.com'
		})
		.end(function(res){
			expect(res.status).to.be(500);
			done();
		});
	});
	it("should get all users", function(done) {
		superagent.get('http://localhost:3000/user')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('moe');
			done();
		});
	});
	it("should get a user by name", function(done){
		superagent.get('http://localhost:3000/user/moe')
		.end(function(res){
			expect(res.body.name).to.be('moe');
			expect(res.body.name).not.to.be('moka');
			expect(res.status).to.be(200);
			done();
		});
	});
	it("should update a user by id", function(done) {
		superagent.put('http://localhost:3000/user/' + baseUser._id)
		.send({
			name: 'mohammed',
			email: 'moe@test.com'
		})
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('mohammed');
			expect(res.body.name).not.to.be('moe');
			done();
		});
	});
	it("should delete a user by id", function(done) {
		superagent.del('http://localhost:3000/user/' + baseUser._id)
		.send({
			email: 'moe@test.com',
			name: 'mohammed'
		})
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body).to.be('User has been deleted successfully');
			done();
		});
	});
});