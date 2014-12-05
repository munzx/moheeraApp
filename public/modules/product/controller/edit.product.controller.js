'use strict';

angular.module('productModule').controller('editProductController', ['$scope', '$stateParams', '$location', 'connectProductFactory', 'productCategoryFactory', function ($scope, $stateParams, $location, connectProductFactory, productCategoryFactory) {
	$scope.categoryOptions = productCategoryFactory;

	connectProductFactory.get({getByName: $stateParams.name}, function (response) {
		$scope.productInfo = response;
	}, function (err) {
		$location.path('/notfound');
	});

	$scope.updateProductInfo = function () {
		connectProductFactory.update($scope.productInfo, function (response) {
			$scope.error = false;
			$scope.success = true;
		}, function (err) {
			$scope.success = false;
			$scope.error = err.data.message;
		});
	}

}]);