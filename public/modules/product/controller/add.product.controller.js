'use strict';

angular.module('productModule').controller('addProductController', ['$scope', '$location', 'connectProductFactory', 'productCategoryFactory', function ($scope, $location, connectProductFactory, productCategoryFactory) {
	$scope.categoryOptions = productCategoryFactory;

	$scope.addProduct = function () {
		connectProductFactory.save($scope.newProduct, function (response) {
			$location.path('profile');
		}, function (err) {
			console.log(err);
			$scope.error = err.data.message;
		});
	}
}]);