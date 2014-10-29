var mongoose = require('mongoose'),
	superagent = require('superagent'),
	expect = require('expect.js'),
	product = require('../models/product');

var baseProduct;

describe("product test", function() {
	it("should create a new product", function(done) {
		superagent.post('http://localhost:3000/product')
		.send({
			name: 'test',
			desc: 'here is a test product',
			category: 'cat'
		})
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('test');
			baseProduct = res.body;
			done();
		});
	});
	it("should refuse to create a deuplicate product name", function(done) {
		superagent.post('http://localhost:3000/product')
		.send({
			name: 'test',
			desc: 'here is a test product',
			category: 'cat'
		})
		.end(function(res){
			expect(res.status).to.be(500);
			done();
		});
	});
	it("should get all products", function(done) {
		superagent.get('http://localhost:3000/product')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('test');
			done();
		});
	});
	it("should get a product by name", function(done) {
		superagent('http://localhost:3000/product/test')
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('test');
			done();
		});
	});
	it("should update a product by id", function(done) {
		superagent.put('http://localhost:3000/product/' + baseProduct._id)
		.send({
			name: 'updated_product',
			desc: 'here is a test product',
			category: 'cat'
		})
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('updated_product');
			done();
		});
	});
	it("should get products in a certain category", function(done) {
		superagent.get('http://localhost:3000/product/category/cat')
		.end(function(res){
			expect(res.body[0].name).to.be('updated_product');
			expect(res.status).to.be(200);
			done();
		});
	});
	it("should delete the product", function(done) {
		superagent.del('http://localhost:3000/product/' + baseProduct._id)
		.end(function(res){
			expect(res.status).to.be(200);
			expect(res.body).to.be('successfully deleted the product');
			done();
		});
	});
});