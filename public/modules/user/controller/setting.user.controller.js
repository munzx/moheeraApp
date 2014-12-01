'use strict';

angular.module('userModule').controller('settingUserController', ['$scope', '$location', 'connectUserFactory', function ($scope, $location, connectUserFactory) {
	$scope.removeAccount = function () {
		$location.path('/profile/remove');
	}

	$scope.updateAccount = function () {
		// userInfo is inherted from the profile controller , this is due to the fact
		// that this conntroller is child controller of the profile controller , this is
		// done through the ui-router
		connectUserFactory.update($scope.userInfo, function (response) {
			$scope.success = true;
		}, function (error) {
			$scope.error = error.data.message;
		});
	}

}]);