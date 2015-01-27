'user strict';

angular.module('moheera').controller('watchImageConfigController', ['$scope', '$rootScope', '$modalInstance', function ($scope, $rootScope, $modalInstance, test) {
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	}

	console.log($scope.newProduct.image1);
}])