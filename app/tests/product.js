'use strict';

var expect = require('expect.js'),
	superagent = require('superagent'),
	mongoose = require('mongoose'),
	product = require('../models/product');

var agent = superagent.agent();
var baseProduct;

describe("product test", function() {
	before(function(done){
		agent.post('http://localhost:3000/login').
		send({ username: 'ss', password: 'ss'})
		.end(function(err, res){
			if(err){
				throw err;
			}
			agent.saveCookies(res);
			done();
		});
	});
	it("should pass the user auth", function(done) {
		agent.get('http://localhost:3000/check')
		.end(function(err, res){
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged in');
			done();
		});
	});
	it("should create a new product", function(done) {
		agent.post('http://localhost:3000/product')
		.send({
			name: 'test',
			desc: 'here is a test product',
			category: 'cat',
			image: 'image'
		})
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('test');
			expect(res.body.user).to.not.be.empty();
			baseProduct = res.body;
			done();
		});
	});
	it("should refuse to create a deuplicate product name", function(done) {
		agent.post('http://localhost:3000/product')
		.send({
			name: 'test',
			desc: 'here is a test product',
			category: 'cat',
			image: 'image'
		})
		.end(function(res){
			expect(res.status).to.be(500);
			done();
		});
	});
	it("should get all products", function(done) {
		agent.get('http://localhost:3000/product')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('test');
			done();
		});
	});
	it("should get a product by name", function(done) {
		agent.get('http://localhost:3000/product/test')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('test');
			expect(res.body.image).to.be('image');
			done();
		});
	});
	it("should update a product by id", function(done) {
		agent.put('http://localhost:3000/product/' + baseProduct._id)
		.send({
			name: 'updated_product',
			desc: 'here is a test product',
			category: 'cat',
			image: 'image'
		})
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('updated_product');
			done();
		});
	});
	it("should get products in a certain category", function(done) {
		agent.get('http://localhost:3000/product/category/cat')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('updated_product');
			done();
		});
	});
	it("should delete the product", function(done) {
		agent.del('http://localhost:3000/product/' + baseProduct._id)
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body).to.be('successfully deleted the product');
			done();
		});
	});
});