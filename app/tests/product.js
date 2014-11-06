'use strict';

var expect = require('expect.js'),
superagent = require('superagent'),
mongoose = require('mongoose'),
product = require('../models/product');

var agent = superagent.agent();
var baseProduct;
var baseOrder;

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
	it("Should pass the user auth", function(done) {
		agent.get('http://localhost:3000/check')
		.end(function(err, res){
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged in');
			done();
		});
	});
	it("Should create a new product", function(done) {
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
			expect(res.body.created).not.to.be.empty();
			baseProduct = res.body;
			done();
		});
	});
	it("Should refuse to create a deuplicate product name", function(done) {
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
	it("Should get all products", function(done) {
		agent.get('http://localhost:3000/product')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('test');
			done();
		});
	});
	it("Should get a product by name", function(done) {
		agent.get('http://localhost:3000/product/test')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('test');
			expect(res.body.image).to.be('image');
			done();
		});
	});
	it("Should update a product by id", function(done) {
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
	it("Should get products in a certain category", function(done) {
		agent.get('http://localhost:3000/product/category/cat')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('updated_product');
			done();
		});
	});
	it("Should create an order", function(done) {
		agent.post('http://localhost:3000/product/' + baseProduct._id + '/order')
		.send({
			address: 'somewhere',
			quantity: 4,
			price: '2000',
			status: 'Pendding'
		})
		.end(function(res) {
			expect(res.body.order[0].price).to.be('2000');
			expect(res.status).to.be(200);
			baseOrder = res.body.order[0];
			done();
		});
	});
	it("Should create another order", function(done) {
		agent.post('http://localhost:3000/product/' + baseProduct._id + '/order')
		.send({
			address: 'somewhere2',
			quantity: 4,
			price: '4000',
			status: 'Pendding'
		})
		.end(function(res) {
			expect(res.body.order[0].price).to.be('2000');
			expect(res.body.order[1].price).to.be('4000');
			expect(res.status).to.be(200);
			done();
		});
	});
	it("Should get all orders of a product", function(done) {
		agent.get('http://localhost:3000/product/' + baseProduct._id +'/order')
		.end(function(res) {
			expect(res.body[0].address).to.be('somewhere');
			expect(res.body[0].created).not.to.be.empty();
			done();
		});
	});
	it("Should get order info by ID", function(done) {
		agent.get('http://localhost:3000/product/' + baseProduct._id +'/order/' + baseOrder._id)
		.end(function(res) {
			expect(res.status).to.be(200);
			expect(res.body.address).to.be('somewhere');
			done();
		});
	});
	it("Should update an order by ID", function(done) {
		agent.put('http://localhost:3000/product/' + baseProduct._id + '/order/' + baseOrder._id)
		.send({
			address: 'updateSomewhere',
			quantity: 4,
			price: '2000',
			status: 'Pendding'
		})
		.end(function(res) {
			expect(res.body.order[0].address).to.be('updateSomewhere');
			done();
		});
	});
	it("Should delete order", function(done) {
		agent.del('http://localhost:3000/product/' + baseProduct._id + '/order/' + baseOrder._id)
		.end(function(res) {
			expect(res.body).to.be('order has been deleted successfully');
			expect(res.status).to.be(200);
			done();
		});
	});
	it("Should delete the product", function(done) {
		agent.del('http://localhost:3000/product/' + baseProduct._id)
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body).to.be('successfully deleted the product');
			done();
		});
	});
});