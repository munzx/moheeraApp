'use strict';

angular.module('productModule').controller('addProductController', ['$scope', '$location', 'connectProductFactory', 'categoryProductFactory', '$state', function ($scope, $location, connectProductFactory, categoryProductFactory, $state) {
	$scope.categoryOptions = categoryProductFactory;

	$scope.addProduct = function () {
		connectProductFactory.save($scope.newProduct, function (response) {
			//go to profile page , use the state and pass empty parameter to reload the controller
			$state.go('profile', {}, {reload: true});
		}, function (err) {
			console.log(err);
			$scope.error = err.data.message;
		});
	}

	$scope.count = function () {
		var count;
		for(var i=1;i<20;i++){
			count[i] = i;
		}
		return count;
	}
}]);