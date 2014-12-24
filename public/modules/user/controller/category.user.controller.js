'use strict';

angular.module('userModule').controller('categoryUserController', ['connectProductFactory', '$stateParams', '$scope', function (connectProductFactory, $stateParams, $scope) {
	connectProductFactory.query({action: "category", categoryName: $stateParams.category}, function (respense) {
		$scope.productByCategory = respense;
	});
}]);