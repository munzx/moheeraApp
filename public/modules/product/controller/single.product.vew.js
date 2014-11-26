'use strict';

angular.module('productModule').controller('singleProductController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
	$scope.removeProduct = function () {
		confirm('You will remove this product along with the comments and the hearts?!');
	}
}]);